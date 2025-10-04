interface SidebarProps {
  heading: string;
  description: string;
}

const Sidebar = ({ heading, description }: SidebarProps) => {
  const popularPosts = [
    "Top 10 Products of 2025",
    "Beginner's Guide to Online Shopping",
    "Save Money with These Tips",
  ];

  return (
    <aside className="space-y-6">
      <div className="border rounded-lg p-6 bg-card">
        <h3 className="text-xl font-semibold mb-4">{heading}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <ul className="space-y-2">
          {popularPosts.map((post, idx) => (
            <li key={idx}>
              <a href="#" className="text-sm hover:text-primary hover:underline">
                {post}
              </a>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="border rounded-lg p-6 bg-card">
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {['Tech', 'Home', 'Fashion', 'Health'].map(cat => (
            <a 
              key={cat}
              href="#"
              className="px-3 py-1 bg-muted rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {cat}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
