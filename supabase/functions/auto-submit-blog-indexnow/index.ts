import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const indexNowApiKey = Deno.env.get('INDEXNOW_API_KEY');
    
    if (!indexNowApiKey) {
      console.error('INDEXNOW_API_KEY not found');
      return new Response(
        JSON.stringify({ error: 'IndexNow API key not configured' }), 
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { blogPostId, action } = await req.json();
    
    if (!blogPostId || !action) {
      return new Response(
        JSON.stringify({ error: 'blogPostId and action are required' }), 
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Get blog post details
    const { data: blogPost, error: blogError } = await supabase
      .from('blog_posts')
      .select('slug, title, published')
      .eq('id', blogPostId)
      .single();

    if (blogError || !blogPost) {
      console.error('Error fetching blog post:', blogError);
      return new Response(
        JSON.stringify({ error: 'Blog post not found' }), 
        { 
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Only submit if the post is published
    if (!blogPost.published) {
      return new Response(
        JSON.stringify({ message: 'Blog post is not published, skipping IndexNow submission' }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const baseUrl = 'https://optixweb.space';
    const blogUrl = `${baseUrl}/blog/${blogPost.slug}`;
    const blogListUrl = `${baseUrl}/blog`;
    
    // Prepare URLs to submit
    const urlsToSubmit = [blogUrl, blogListUrl];
    
    // If it's a new post, also submit the homepage
    if (action === 'insert') {
      urlsToSubmit.push(baseUrl);
    }

    const indexNowPayload = {
      host: 'optixweb.space',
      key: indexNowApiKey,
      keyLocation: `${baseUrl}/${indexNowApiKey}.txt`,
      urlList: urlsToSubmit
    };

    console.log('Auto-submitting blog post to IndexNow:', indexNowPayload);

    // Submit to IndexNow API
    const indexNowResponse = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(indexNowPayload),
    });

    const responseText = await indexNowResponse.text();
    console.log('IndexNow response status:', indexNowResponse.status);
    console.log('IndexNow response:', responseText);

    if (indexNowResponse.ok || indexNowResponse.status === 202) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `Blog post "${blogPost.title}" submitted to IndexNow successfully`,
          submittedUrls: urlsToSubmit,
          action: action
        }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    } else {
      console.error('IndexNow API error:', indexNowResponse.status, responseText);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to submit blog post to IndexNow',
          status: indexNowResponse.status,
          details: responseText
        }), 
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

  } catch (error) {
    console.error('Error in auto-submit-blog-indexnow function:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});