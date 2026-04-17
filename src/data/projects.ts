export interface Project {
  id: number;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "News Trend Analyzer",
    description: "Analyze trending topics across news categories (politics, sports, tech).",
    features: [
      "Scrape news articles from multiple sources",
      "Classify articles by topic and sentiment",
      "Track trending keywords over time",
      "AI-powered summarization of top stories",
      "Interactive trend dashboard",
      "Keyword frequency and co-occurrence analysis"
    ],
    icon: "fa-newspaper"
  },
  {
    id: 2,
    title: "Fake vs Real News Classifier",
    description: "Build a tool that helps detect potentially misleading news articles.",
    features: [
      "Collect labeled news articles from the web",
      "Extract textual features (TF-IDF, n-grams)",
      "Train a classification model (fake vs real)",
      "AI-powered credibility scoring",
      "Display reasoning behind classification",
      "Evaluate model with precision, recall, F1"
    ],
    icon: "fa-shield-halved"
  },
  {
    id: 3,
    title: "News Summarization Dashboard",
    description: "Auto-summarize breaking news from multiple outlets into concise briefs.",
    features: [
      "Multi-source news scraping pipeline",
      "AI-assisted text summarization",
      "Category-based filtering (world, business, tech)",
      "Keyword extraction and tagging",
      "Daily digest generation",
      "Searchable article archive"
    ],
    icon: "fa-file-lines"
  },
  {
    id: 4,
    title: "E-Commerce Review Analyzer",
    description: "Analyze customer reviews for product intelligence insights.",
    features: [
      "Scrape product reviews from e-commerce sites",
      "Sentiment analysis on review text",
      "Aspect-based opinion mining",
      "Star rating vs sentiment correlation",
      "Product comparison dashboard",
      "Top complaints and praise extraction"
    ],
    icon: "fa-cart-shopping"
  },
  {
    id: 5,
    title: "Product Comparison Tool",
    description: "Amazon-like product analysis with feature-by-feature comparisons.",
    features: [
      "Scrape product specs and reviews",
      "Structured data storage in JSON",
      "Side-by-side feature comparison",
      "AI-powered pros & cons generation",
      "Price trend tracking",
      "User-friendly comparison interface"
    ],
    icon: "fa-scale-balanced"
  },
  {
    id: 6,
    title: "Customer Sentiment Dashboard",
    description: "Real-time sentiment tracking across product reviews and social mentions.",
    features: [
      "Multi-source data collection (reviews, mentions)",
      "Real-time sentiment classification",
      "Emotion detection (happy, angry, neutral)",
      "Time-series sentiment visualization",
      "Alert system for negative sentiment spikes",
      "Export reports for stakeholders"
    ],
    icon: "fa-face-smile"
  },
  {
    id: 7,
    title: "Job Trend Analyzer",
    description: "Track job market trends and identify in-demand skills.",
    features: [
      "Scrape job listings from career portals",
      "Extract required skills and qualifications",
      "Identify trending technologies and roles",
      "Salary range analysis by role/location",
      "AI-powered skill recommendation",
      "Interactive job market dashboard"
    ],
    icon: "fa-briefcase"
  },
  {
    id: 8,
    title: "Skill Demand Tracking System",
    description: "Monitor which technical skills employers are seeking the most.",
    features: [
      "Crawl job descriptions across industries",
      "NLP-based skill extraction pipeline",
      "Skill frequency and trend analysis",
      "Compare skill demand across regions",
      "AI classification of skill categories",
      "Visualization of rising/declining skills"
    ],
    icon: "fa-chart-line"
  },
  {
    id: 9,
    title: "Job Classification & Filtering Tool",
    description: "Automatically classify and filter jobs by category, level, and type.",
    features: [
      "Scrape diverse job listings",
      "Multi-label classification (category, seniority)",
      "Smart search with IR-style retrieval",
      "Filter by remote/hybrid/onsite",
      "AI-powered job-to-resume matching",
      "Exportable filtered results"
    ],
    icon: "fa-filter"
  },
  {
    id: 10,
    title: "Movie Review Sentiment Dashboard",
    description: "Analyze movie reviews to gauge audience reception and trends.",
    features: [
      "Scrape reviews from movie platforms",
      "Sentiment scoring per movie",
      "Genre-based sentiment comparison",
      "AI summarization of critic consensus",
      "Box office vs sentiment correlation",
      "Top positive/negative review highlights"
    ],
    icon: "fa-film"
  },
  {
    id: 11,
    title: "Film Recommendation Explorer",
    description: "Content-based movie recommendation system using scraped data.",
    features: [
      "Build a movie dataset via web scraping",
      "TF-IDF on plot descriptions and genres",
      "Content-based similarity matching",
      "AI-enhanced recommendation explanations",
      "User preference input interface",
      "Evaluate recommendations with test users"
    ],
    icon: "fa-clapperboard"
  },
  {
    id: 12,
    title: "IMDb-Style Analysis Tool",
    description: "Deep analysis of movie/TV data with ratings, cast, and trend insights.",
    features: [
      "Scrape movie metadata (cast, ratings, year)",
      "Statistical analysis of ratings distributions",
      "Actor/director performance tracking",
      "Genre popularity trends over decades",
      "AI-generated movie tag suggestions",
      "Interactive exploration dashboard"
    ],
    icon: "fa-star"
  },
  {
    id: 13,
    title: "Recipe Recommendation System",
    description: "Suggest recipes based on ingredients, cuisine, and dietary preferences.",
    features: [
      "Scrape recipes from cooking websites",
      "Ingredient-based search and retrieval",
      "Cuisine classification (Italian, Asian, etc.)",
      "AI-powered dietary substitution suggestions",
      "Nutritional information extraction",
      "Personalized recommendation interface"
    ],
    icon: "fa-utensils"
  },
  {
    id: 14,
    title: "Ingredient-Based Search Tool",
    description: "Find recipes by what you have in your kitchen — IR-style retrieval.",
    features: [
      "Build a recipe corpus from the web",
      "Inverted index on ingredient lists",
      "Boolean and ranked retrieval models",
      "AI-powered ingredient pairing suggestions",
      "Handle synonyms and variations",
      "User-friendly search interface"
    ],
    icon: "fa-carrot"
  },
  {
    id: 15,
    title: "Cuisine Classification Dashboard",
    description: "Classify and explore recipes by cuisine type using ML.",
    features: [
      "Multi-source recipe scraping",
      "Feature extraction from recipe text",
      "Train cuisine type classifier",
      "Confusion matrix and accuracy metrics",
      "Explore cuisines by region on a dashboard",
      "AI-generated cuisine style descriptions"
    ],
    icon: "fa-globe"
  },
  {
    id: 16,
    title: "Travel Destination Insights",
    description: "Analyze travel reviews to surface the best destinations and experiences.",
    features: [
      "Scrape travel reviews and guides",
      "Sentiment analysis on destination reviews",
      "Seasonal trend analysis",
      "AI-powered travel recommendation engine",
      "Budget vs rating correlation analysis",
      "Interactive destination explorer map"
    ],
    icon: "fa-plane"
  },
  {
    id: 17,
    title: "Hotel Review Analysis System",
    description: "Deep-dive into hotel reviews to extract quality insights.",
    features: [
      "Scrape hotel reviews from booking platforms",
      "Aspect-based sentiment (cleanliness, service, etc.)",
      "Price-to-satisfaction ratio analysis",
      "AI-generated review summaries",
      "Comparison across hotel chains",
      "Trend analysis over time"
    ],
    icon: "fa-hotel"
  },
  {
    id: 18,
    title: "Tourist Trend Analyzer",
    description: "Track tourism trends and popular destinations worldwide.",
    features: [
      "Crawl tourism blogs and review sites",
      "Keyword and topic extraction",
      "Seasonal popularity patterns",
      "AI classification of travel types (adventure, luxury, etc.)",
      "Geographic trend visualization",
      "Insight generation for travel agencies"
    ],
    icon: "fa-map-location-dot"
  },
  {
    id: 19,
    title: "Developer Article Analyzer",
    description: "Analyze programming articles and tutorials for tech insights.",
    features: [
      "Scrape tech blogs and dev platforms",
      "Topic modeling on article content",
      "Programming language trend analysis",
      "AI-powered article quality scoring",
      "Author influence tracking",
      "Technology stack popularity dashboard"
    ],
    icon: "fa-code"
  },
  {
    id: 20,
    title: "Tech Topic Clustering Tool",
    description: "Cluster and explore technology topics from developer communities.",
    features: [
      "Crawl developer forums and Q&A sites",
      "TF-IDF vectorization of discussions",
      "K-means or hierarchical clustering",
      "AI-generated cluster labels and summaries",
      "Interactive cluster visualization",
      "Trending topic detection over time"
    ],
    icon: "fa-diagram-project"
  },
  {
    id: 21,
    title: "Programming Trend Dashboard",
    description: "Monitor the rise and fall of programming languages and frameworks.",
    features: [
      "Scrape job posts, articles, and repositories",
      "Language and framework mention frequency",
      "Year-over-year growth analysis",
      "AI-powered future trend predictions",
      "Community sentiment per technology",
      "Interactive comparison charts"
    ],
    icon: "fa-laptop-code"
  }
];
