import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createBreadcrumbStructuredData } from "@/hooks/useSEO";
import { Helmet } from "react-helmet-async";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  const allItems = [
    { name: "Home", url: "https://optixweb.space/" },
    ...items
  ];

  const structuredData = createBreadcrumbStructuredData(allItems);

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        {allItems.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
            {index === allItems.length - 1 ? (
              <span className="text-foreground font-medium">{item.name}</span>
            ) : (
              <Link 
                to={item.url.replace('https://optixweb.space', '')} 
                className="hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
};