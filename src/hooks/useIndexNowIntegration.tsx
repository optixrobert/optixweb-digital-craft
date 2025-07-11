import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useIndexNowIntegration = () => {
  useEffect(() => {
    const handleBlogPostChanges = async (payload: any) => {
      console.log('Blog post change detected:', payload);
      
      // Check if it's a new published post or an update to published status
      if (payload.eventType === 'INSERT' || 
          (payload.eventType === 'UPDATE' && payload.new.published && !payload.old.published)) {
        
        try {
          const { error } = await supabase.functions.invoke('auto-submit-blog-indexnow', {
            body: {
              blogPostId: payload.new.id,
              action: payload.eventType === 'INSERT' ? 'insert' : 'update'
            }
          });

          if (error) {
            console.error('Error auto-submitting to IndexNow:', error);
          } else {
            console.log('Successfully auto-submitted blog post to IndexNow');
          }
        } catch (error) {
          console.error('Error invoking auto-submit function:', error);
        }
      }
    };

    // Subscribe to blog_posts table changes
    const subscription = supabase
      .channel('blog_posts_indexnow')
      .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'blog_posts' }, 
          handleBlogPostChanges
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);
};

export default useIndexNowIntegration;