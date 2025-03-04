export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  emojis: { icon: string; meaning: string }[];
  overview: string;
  asciiArt: string;
  demoLink: string;
  stressLevel: number;
  metrics: { label: string; value: string | React.ReactNode }[];
  techStack: {
    name: string;
    level: number;
    comment: string;
    snippet?: string;
  }[];
  problems: { issue: string; solution: string }[];
  challenges: {
    id: string;
    title: string;
    status: 'OPEN' | 'CLOSED' | 'WONTFIX' | 'PATCHED';
    description?: string;
  }[];
}

export const PROJECTS: Record<string, ProjectData> = {
  "cat-treat-dispenser": {
    id: "cat-treat-dispenser",
    title: "Feline Snack Automaton 3000",
    subtitle:
      "Automate cat treat dispenser using Raspberry Pi + IoT with 99.9% purr-formance uptime",
    emojis: [
      { icon: "🐱", meaning: "Pet-focused technology" },
      { icon: "🤖", meaning: "Automation solution" },
      { icon: "🍪", meaning: "Food dispensing capability" },
    ],
    overview:
      './launch --project --purpose="Automate cat treat dispenser using Raspberry Pi + IoT"',
    asciiArt: `
       /\\___/\\     +---------------------+
      ( =^.^= )----| Raspberry Pi        |
       >  Y  <     | +-----------------+ |
                   | | Cat Treat API   | |
                   | | GET /treats     | |
                   | +-----------------+ |
                   +----------+----------+
                              |
                   +----------v----------+
                   | Servo Motor Control |
                   | - Calibration      |
                   | - Treat Trajectory |
                   +----------+----------+
                              |
                   +----------v----------+
                   |                     |
            +------+  Treat Receptacle   +-----+
            |      |                     |     |
            |      +---------------------+     |
        \\   |                                  |   /
         \\  |             TREATS               |  /
          \\ |                                  | /
           \\|                                  |/
            *            Your Cat              *
      `,
    demoLink: "https://meow.cafe",
    stressLevel: 3,
    metrics: [
      { label: "Latency", value: "42ms" },
      { label: "Stars", value: "1.2k" },
      {
        label: "Coffee Cups Spent",
        value: (
          <div className="flex" data-caffeine={4}>
            <span className="mr-1">☕</span>
            <span className="mr-1">☕</span>
            <span className="mr-1">☕</span>
          </div>
        ),
      },
    ],
    techStack: [
      {
        name: "Python",
        level: 4,
        comment: "I speak fluent list comprehensions",
        snippet: "pip install raspberry-py-cat-treats",
      },
      {
        name: "AWS",
        level: 2,
        comment: "I can break S3 buckets",
        snippet: "aws s3 cp treats.py s3://cat-storage/",
      },
      {
        name: "Raspberry Pi",
        level: 3,
        comment: "It's just Linux with more LEDs",
        snippet: "sudo apt-get install cat-dependencies",
      },
      {
        name: "IoT Protocols",
        level: 3,
        comment: "MQTT or it didn't happen",
        snippet: 'mqtt.publish("treats/dispense", { amount: 3 })',
      },
    ],

    problems: [
      {
        issue: "Cats could not trigger treats remotely",
        solution: "Implemented paw-print recognition system",
      },
      {
        issue: "Treat trajectory inconsistent",
        solution: "Created physics-based calibration tool",
      },
      {
        issue: "System overheating from constant cat attention",
        solution: "Added cooling system with catnip-scented exhaust",
      },
    ],
    challenges: [
      {
        id: "42",
        title: "GPIO pins hated my cat's paw conductivity",
        status: "CLOSED",
        description:
          "After 3am debugging sessions, discovered cats generate static electricity that interferes with sensors.",
      },
      {
        id: "69",
        title: "Treat catapult velocity calculations → fur on keyboard",
        status: "WONTFIX",
        description:
          "Physics simulations kept failing because the cat insisted on sitting on my laptop during crucial calculations.",
      },
      {
        id: "101",
        title: "Cat learned to hack the system by meowing at 3am",
        status: "OPEN",
        description:
          "The AI pattern detection now recognizes particular meow frequencies as authentication overrides.",
      },
    ],
  },
  "bad-ideas": {
    id: "bad-ideas",
    title: "npm install bad-ideas",
    subtitle:
      "A React hook library for questionable life choices with 0% regret prevention",
    emojis: [
      { icon: "🔥", meaning: "Potentially destructive functionality" },
      { icon: "🤔", meaning: "Questionable design decisions" },
      { icon: "⚠️", meaning: "Use at your own risk" },
    ],
    overview: "A React hook library for questionable life choices.",
    asciiArt: `
      +---------------------+        +---------------------+
      |                     |        |                     |
      |    React App        +------->+    bad-ideas        |
      |                     |        |    Hooks Library    |
      +---------------------+        +---------+-----------+
                                              |
                                              v
      +---------------------+        +---------------------+
      |                     |        |                     |
      |    Failed Code      |<-------+  useRegret()        |
      |    Reviews          |        |  useOverengineering()|
      |                     |        |  useCaffeine()      |
      +---------------------+        +---------------------+
      `,
    demoLink: "https://bad-ideas.dev",
    stressLevel: 4,
    metrics: [
      { label: "Bundle Size", value: "420kb" },
      { label: "Downloads", value: "69k/month" },
      {
        label: "Coffee Cups Spent",
        value: (
          <div className="flex" data-caffeine="5">
            <span className="mr-1">☕</span>
            <span className="mr-1">☕</span>
            <span className="mr-1">☕</span>
            <span className="mr-1">☕</span>
            <span className="mr-1">☕</span>
          </div>
        ),
      },
    ],
    techStack: [
      {
        name: "JavaScript",
        level: 5,
        comment: "I've seen things",
        snippet: "npm install bad-ideas --save-dev",
      },
      {
        name: "React",
        level: 4,
        comment: "Hooks, not crooks",
        snippet: 'import { useRegret } from "bad-ideas";',
      },
      {
        name: "TypeScript",
        level: 3,
        comment: "Types are just suggestions",
        snippet: "type BadIdea = any; // Just like my life choices",
      },
      {
        name: "npm",
        level: 4,
        comment: "node_modules weighs more than my cat",
        snippet: "rm -rf node_modules && npm i && npm i --force",
      },
    ],
    problems: [
      {
        issue: "React hooks causing existential crises",
        solution: "Added useRegret() with built-in therapy mode",
      },
      {
        issue: "Bundle size exceeding reasonable limits",
        solution:
          "Implemented quantum compression (files exist in superposition)",
      },
      {
        issue: "Documentation too helpful and clear",
        solution: "Added random Star Trek references and cryptic emoji codes",
      },
    ],
    challenges: [
      {
        id: "1",
        title: "Context API overuse caused existential crises",
        status: "PATCHED",
        description:
          "Developers began questioning their life choices when nesting more than 15 context providers.",
      },
      {
        id: "2",
        title: "TypeScript types argued with my life choices",
        status: "WONTFIX",
        description:
          "The type system developed sentience and began rejecting code based on aesthetic preferences.",
      },
      {
        id: "3",
        title: "Dependency hell opened an actual portal to hell",
        status: "OPEN",
        description:
          "npm audit now requires holy water and incantations to complete successfully.",
      },
    ],
  },
  // NTX 2024-2025
  "local-first-app": {
    id: "local-first-app",
    title: "Offline-First Dimension Hopper",
    subtitle: "Sync engine that works in underground bunkers",
    emojis: [
      { icon: "📡", meaning: "Bi-directional sync" },
      { icon: "📴", meaning: "Offline capabilities" },
      { icon: "🔄", meaning: "Conflict resolution" }
    ],
    overview: './launch --sync --mode="post-apocalyptic"',
    asciiArt: `
      [LOCAL DEVICE]
        | 📴
      +---------------------+
      | ElectricSQL Core    |
      | - CRDT Magic        |
      +----------+----------+
                 | 🔄
      +----------v----------+
      | Cloud Syncer        |
      | - rclone            |
      | - MinIO             |
      +----------+----------+
                 | 📡
      [CENTRAL POSTGRESQL]
    `,
    demoLink: "https://ntx-tech.local",
    stressLevel: 3,
    metrics: [
      { label: "Sync Speed", value: "420ms" },
      { label: "Conflict Resolutions", value: "0.1%" },
      { label: "Coffee Spills", value: "3 mugs" }
    ],
    techStack: [
      {
        name: "ElectricSQL",
        level: 4,
        comment: "CRDTs are my love language",
        snippet: "sync().then(celebrate)"
      },
      {
        name: "NestJS",
        level: 3,
        comment: "TypeScript all the way down",
        snippet: "@Sync()\nasync handleConflict()"
      }
    ],
    problems: [
      {
        issue: "Sync conflicts more frequent than cat demands",
        solution: "Implemented CRDT-based conflict-free resolution"
      },
      {
        issue: "Offline storage eating devices alive",
        solution: "Compacted data like a trash compactor"
      }
    ],
    challenges: [
      {
        id: "1",
        title: "UUIDs colliding like drunk particles",
        status: "PATCHED",
        description: "Implemented ULID with temporal ordering"
      }
    ]
  },
  "data-management-system": {
    id: "data-management-system",
    title: "ETL Whisperer",
    subtitle: "End-to-end data management system for Excel, PDF, and more",
    emojis: [
      { icon: "📂", meaning: "Data collection and storage" },
      { icon: "🚰", meaning: "ETL pipelines" },
      { icon: "📊", meaning: "Data visualization" },
    ],
    overview:
      './launch --data --purpose="Turn chaos into insights."',
    asciiArt: `
      +---------------------+
      |  Data Sources       |
      |  +--------------+   |
      |  | Excel        |   |
      |  | PDF          |   |
      |  | APIs         |   |
      |  +--------------+   |
      |         |           |
      |         v           |
      |  +--------------+   |
      |  | ETL Pipeline |   |
      |  | (Mage, pandas)| |
      |  +--------------+   |
      |         |           |
      |         v           |
      |  +--------------+   |
      |  | PostgreSQL   |   |
      |  | Database     |   |
      |  +--------------+   |
      |         |           |
      |         v           |
      |  +--------------+   |
      |  | Metabase     |   |
      |  | Dashboards   |   |
      |  +--------------+   |
      +---------------------+
    `,
    demoLink: "https://data.ntx.com",
    stressLevel: 5,
    metrics: [
      { label: "Data Sources Integrated", value: "10+" },
      { label: "ETL Pipelines Built", value: "15+" },
      { label: "Coffee Cups Spent", value: "☕☕☕☕☕" },
    ],
    techStack: [
      {
        name: "Mage",
        level: 4,
        comment: "For orchestrating ETL pipelines",
        snippet: "mage run data_pipeline",
      },
      {
        name: "pandas",
        level: 5,
        comment: "Data wrangling wizardry",
        snippet: "df = pd.read_excel('data.xlsx')",
      },
      {
        name: "PostgreSQL",
        level: 4,
        comment: "Structured data storage",
        snippet: "SELECT * FROM data_table;",
      },
      {
        name: "Celery",
        level: 3,
        comment: "Asynchronous task management",
        snippet: "celery -A tasks worker --loglevel=info",
      },
      {
        name: "Metabase",
        level: 3,
        comment: "For stakeholder-friendly dashboards",
        snippet: "metabase start",
      },
    ],
    problems: [
      {
        issue: "Data quality issues from inconsistent sources",
        solution: "Implemented Great Expectations for data validation",
      },
      {
        issue: "PDF data extraction was error-prone",
        solution: "Developed custom algorithms using PyPDF2, fuzzy matching algorithm, and RegEx",
      },
      {
        issue: "Real-time data processing bottlenecks",
        solution: "Built event-driven architecture with Celery and Redis",
      },
    ],
    challenges: [
      {
        id: "1",
        title: "PDF data extraction was a nightmare",
        status: "CLOSED",
        description:
          "Developed a custom algorithm to extract and transform PDF content into structured tabular formats.",
      },
      {
        id: "2",
        title: "ETL pipeline failures due to data inconsistencies",
        status: "PATCHED",
        description:
          "Integrated Great Expectations to enforce data quality checks throughout the pipeline.",
      },
    ],
  },
  "content-management-system": {
    id: "content-management-system",
    title: "Architecture Wizard",
    subtitle: "Pre-sales engineering for a cutting-edge content management system",
    emojis: [
      { icon: "📝", meaning: "System architecture" },
      { icon: "🧩", meaning: "Pre-sales engineering" },
      { icon: "🐹", meaning: "Prototyping and demos" },
    ],
    overview: './launch --cms --mode="chaos"',
    asciiArt: `
      +---------------------+
      |  Client Needs       |
      |  +--------------+   |
      |  | Requirements |   |
      |  | Gathering    |   |
      |  +--------------+   |
      |         |           |
      |         v           |
      |  +--------------+   |
      |  | Architecture |   |
      |  | Design       |   |
      |  +--------------+   |
      |         |           |
      |         v           |
      |  +--------------+   |
      |  | Prototyping  |   |
      |  | & Demos      |   |
      |  +--------------+   |
      |         |           |
      |         v           |
      |  +--------------+   |
      |  | Client       |   |
      |  | Approval     |   |
      |  +--------------+   |
      +---------------------+
    `,
    demoLink: "https://cms.ntx.com",
    stressLevel: 3,
    metrics: [
      { label: "Architecture Docs Created", value: "10+" },
      { label: "Prototypes Built", value: "5+" },
      { label: "Coffee Cups Spent", value: "☕☕☕" },
    ],
    techStack: [
      {
        name: "Eraser.IO",
        level: 4,
        comment: "For system architecture diagrams",
        snippet: "Architecture -> Design -> Prototype",
      },
      {
        name: "PostgreSQL",
        level: 3,
        comment: "Database schema design",
        snippet: "CREATE TABLE cms_data (id SERIAL PRIMARY KEY);",
      },
      {
        name: "Golang",
        level: 3,
        comment: "Backend prototyping",
        snippet: "func main() { fmt.Println('Hello, CMS!') }",
      },
      {
        name: "Docker",
        level: 3,
        comment: "Containerized demos",
        snippet: "docker-compose up -d",
      },
    ],
    problems: [
      {
        issue: "Clients struggled to visualize the system",
        solution: "Created detailed architecture diagrams and flowcharts",
      },
      {
        issue: "Prototyping was time-consuming",
        solution: "Leveraged Docker and Golang for rapid development",
      },
      {
        issue: "Stakeholders needed clearer documentation",
        solution: "Developed comprehensive functional specifications",
      },
    ],
    challenges: [
      {
        id: "1",
        title: "Client requirements kept changing",
        status: "CLOSED",
        description:
          "Implemented an agile approach to adapt to evolving client needs.",
      },
      {
        id: "2",
        title: "Prototype performance issues",
        status: "PATCHED",
        description:
          "Optimized Golang code and Docker configurations for faster demos.",
      },
    ],
  },
  "financial-analytics": {
    id: "financial-analytics",
    title: "Money Mapper",
    subtitle: "Money moves visualized in 16-bit glory",
    emojis: [
      { icon: "💸", meaning: "Financial data" },
      { icon: "🕸️", meaning: "Graph database" },
      { icon: "🧮", meaning: "Data analysis" },
    ],
    overview:
      "Designed and implemented a comprehensive financial analytics application with relational and graph database capabilities, enabling insightful visualizations and descriptive analysis.",
    asciiArt: `
      +---------------------+
      |  Financial Data     |
      |  +--------------+   |
      |  | Relational   |   |
      |  | Database     |   |
      |  | (PostgreSQL) |   |
      |  +--------------+   |
      |         |           |
      |         v           |
      |  +--------------+   |
      |  | Graph        |   |
      |  | Database     |   |
      |  | (Apache AGE) |   |
      |  +--------------+   |
      |         |           |
      |         v           |
      |  +--------------+   |
      |  | Analytics    |   |
      |  | Engine       |   |
      |  +--------------+   |
      |         |           |
      |         v           |
      |  +---------------+  |
      |  | Visualizations|  |
      |  | (vue.js) .    |  |
      |  +---------------+  |
      +---------------------+
    `,
    demoLink: "https://finance.ntx.com",
    stressLevel: 4,
    metrics: [
      { label: "Data Points Analyzed", value: "1M+" },
      { label: "Graph Relationships", value: "500k+" },
      { label: "Coffee Cups Spent", value: "☕☕☕☕" },
    ],
    techStack: [
      {
        name: "PostgreSQL",
        level: 4,
        comment: "For structured financial data",
        snippet: "SELECT * FROM financial_data;",
      },
      {
        name: "Apache AGE",
        level: 3,
        comment: "For graph-based financial relationships",
        snippet: "MATCH (a:Account)-[:TRANSFER]->(b:Account)",
      },
      {
        name: "Mage",
        level: 4,
        comment: "ETL pipelines for financial data",
        snippet: "mage run financial_pipeline",
      },
      {
        name: "pandas",
        level: 5,
        comment: "Data manipulation and analysis",
        snippet: "df.groupby('category').sum()",
      },
      {
        name: "FastAPI",
        level: 3,
        comment: "RESTful services for data access",
        snippet: "@app.get('/financial-data')",
      },
    ],
    problems: [
      {
        issue: "Complex financial relationships were hard to model",
        solution: "Integrated Apache AGE for graph-based analysis",
      },
      {
        issue: "Data transformation was slow and error-prone",
        solution: "Built efficient ETL pipelines using Mage and pandas",
      },
      {
        issue: "Stakeholders needed better visualizations",
        solution: "Developed dashboards with descriptive analytics",
      },
    ],
    challenges: [
      {
        id: "1",
        title: "Graph database integration was tricky",
        status: "CLOSED",
        description:
          "Spent weeks optimizing Apache AGE queries for financial relationship mapping.",
      },
      {
        id: "2",
        title: "Data transformation pipelines kept breaking",
        status: "PATCHED",
        description:
          "Implemented robust error handling and logging in Mage pipelines.",
      },
    ],
  },
  // Aptaworks 2022-2024
  "palm-oil-management-system": {
    id: "palm-oil-management-system",
    title: "Palm Oil Sentinel",
    subtitle: "Palm oil tracker greener than cat grass",
    emojis: [
      { icon: "🌴", meaning: "Palm oil plantations" },
      { icon: "📊", meaning: "Data-driven insights" },
      { icon: "♻️", meaning: "Sustainability focus" },
    ],
    overview:
      "Designed and developed a secure, scalable backend system for managing palm oil plantations, ensuring high performance and reliability.",
    asciiArt: `
      +---------------------+
      |  Palm Oil Data      |
      |  +--------------+   |
      |  | Plantation   |   |
      |  | Metrics      |   |
      |  +--------------+   |
      |         |           |
      |         v           |
      |  +--------------+   |
      |  | Golang       |   |
      |  | Backend      |   |
      |  +--------------+   |
      |         |           |
      |         v           |
      |  +--------------+   |
      |  | PostgreSQL   |   |
      |  | Database     |   |
      |  +--------------+   |
      |         |           |
      |         v           |
      |  +--------------+   |
      |  | RESTful API  |   |
      |  | Integration  |   |
      |  +--------------+   |
      +---------------------+
    `,
    demoLink: "https://palmtech.aptaworks.com",
    stressLevel: 4,
    metrics: [
      { label: "Plantations Managed", value: "50+" },
      { label: "API Latency", value: "150ms" },
      { label: "Coffee Cups Spent", value: "☕☕☕☕" },
    ],
    techStack: [
      {
        name: "Golang",
        level: 4,
        comment: "High-performance backend",
        snippet: "func main() { fmt.Println('Managing palms!') }",
      },
      {
        name: "PostgreSQL",
        level: 4,
        comment: "Scalable database for plantation data",
        snippet: "SELECT * FROM plantations WHERE yield > 1000;",
      },
      {
        name: "AWS",
        level: 3,
        comment: "Cloud hosting for reliability",
        snippet: "aws ec2 run-instances",
      },
    ],
    problems: [
      {
        issue: "Database performance degraded with scale",
        solution: "Optimized queries and added indexing",
      },
      {
        issue: "API downtime during peak usage",
        solution: "Scaled infrastructure with AWS",
      },
      {
        issue: "Data security concerns",
        solution: "Implemented robust access controls",
      },
    ],
    challenges: [
      {
        id: "1",
        title: "Database schema complexity",
        status: "CLOSED",
        description:
          "Redesigned schema to handle large-scale plantation data efficiently.",
      },
      {
        id: "2",
        title: "API performance bottlenecks",
        status: "PATCHED",
        description:
          "Optimized Golang code and added caching mechanisms.",
      },
      {
        id: "3",
        title: "Everchanging requirements",
        status: "OPEN",
        description:
          "Staying agile to adapt to everchanging business needs.",
      }
    ],
  },
  "childcare-management-system": {
    id: "childcare-management-system",
    title: "Daycare Guardian",
    subtitle: "Daycare system more secure than a laser-pointer vault",
    emojis: [
      { icon: "🔒", meaning: "Secure system" },
      { icon: "📈", meaning: "Scalable performance" },
      { icon: "👶", meaning: "Childcare focus" },
    ],
    overview:
      "Developed a secure, scalable backend system for managing daycare operations, ensuring high performance and customer satisfaction.",
    asciiArt: `
      +---------------------+
      |  Childcare Data     |
      |  +--------------+   |
      |  | Child        |   |
      |  | Records      |   |
      |  +--------------+   |
      |         |           |
      |         v           |
      |  +--------------+   |
      |  | Golang       |   |
      |  | Backend      |   |
      |  +--------------+   |
      |         |           |
      |         v           |
      |  +--------------+   |
      |  | PostgreSQL   |   |
      |  | Database     |   |
      |  +--------------+   |
      |         |           |
      |         v           |
      |  +--------------+   |
      |  | RESTful API  |   |
      |  | Integration  |   |
      |  +--------------+   |
      +---------------------+
    `,
    demoLink: "https://daycare.aptaworks.com",
    stressLevel: 3,
    metrics: [
      { label: "Children Managed", value: "500+" },
      { label: "API Latency", value: "100ms" },
      { label: "Coffee Cups Spent", value: "☕☕☕" },
    ],
    techStack: [
      {
        name: "Golang",
        level: 4,
        comment: "High-performance backend",
        snippet: "func main() { fmt.Println('Managing kids!') }",
      },
      {
        name: "PostgreSQL",
        level: 4,
        comment: "Secure database for childcare data",
        snippet: "SELECT * FROM children WHERE age < 5;",
      },
      {
        name: "AWS",
        level: 3,
        comment: "Cloud hosting for reliability",
        snippet: "aws ec2 run-instances",
      },
    ],
    problems: [
      {
        issue: "Data security concerns",
        solution: "Implemented robust access controls and encryption",
      },
      {
        issue: "API downtime during peak usage",
        solution: "Scaled infrastructure with AWS",
      },
      {
        issue: "User complaints about slow performance",
        solution: "Optimized backend code and database queries",
      },
    ],
    challenges: [
      {
        id: "1",
        title: "Database schema complexity",
        status: "CLOSED",
        description:
          "Redesigned schema to handle childcare data efficiently.",
      },
      {
        id: "2",
        title: "API performance bottlenecks",
        status: "PATCHED",
        description:
          "Optimized Golang code and added caching mechanisms.",
      },
    ],
  },
  "hr-management-system": {
    id: "hr-management-system",
    title: "HR Cloud Core",
    subtitle: "HR backend that survives AWS chaos monkeys",
    emojis: [
      { icon: "👥", meaning: "Human resources" },
      { icon: "☁️", meaning: "Cloud-hosted" },
      { icon: "🚀", meaning: "High performance" },
    ],
    overview:
      "Built a high-performance backend for an HR management system, handling increased traffic and ensuring reliability.",
    asciiArt: `
      +---------------------+
      |  HR Data            |
      |  +--------------+   |
      |  | AWS         |   |
      |  | Cloud Hosting|   |
      |  +--------------+   |
      |         |           |
      |         v           |
      |  +--------------+   |
      |  | Python       |   |
      |  | Backend      |   |
      |  +--------------+   |
      |         |           |
      |         v           |
      |  +--------------+   |
      |  | Frontend     |   |
      |  | Integration  |   |
      |  +--------------+   |
      +---------------------+
    `,
    demoLink: "https://mekarya.aptaworks.com",
    stressLevel: 5,
    metrics: [
      { label: "Traffic Handled", value: "10k+ requests/day" },
      { label: "Uptime", value: "99.99%" },
      { label: "Coffee Cups Spent", value: "☕☕☕☕" },
    ],
    techStack: [
      {
        name: "Python",
        level: 4,
        comment: "Backend logic and APIs",
        snippet: "def handle_hr_request():",
      },
      {
        name: "AWS",
        level: 3,
        comment: "Cloud hosting and scaling",
        snippet: "aws ec2 run-instances",
      },
      {
        name: "Supabase",
        level: 3,
        comment: "Database and auth",
        snippet: "supabase.from('employees').select()",
      },
    ],
    problems: [
      {
        issue: "Traffic spikes caused downtime",
        solution: "Scaled infrastructure with AWS",
      },
      {
        issue: "Codebase was hard to maintain",
        solution: "Developed reusable libraries",
      },
    ],
    challenges: [
      {
        id: "1",
        title: "AWS cost overruns",
        status: "CLOSED",
        description: "Optimized instance usage to reduce costs.",
      },
      {
        id: "2",
        title: "First time doing an end-to-end backend, alone",
        status: "PATCHED",
        description: "Developed and deployed a complete backend solution independently, overcoming initial challenges and learning valuable lessons along the way.",
      },
    ],
  },
  "risk-management-system": {
    id: "risk-management-system",
    title: "Risk API",
    subtitle: "RESTful API for risk management, faster than Monday mornings",
    emojis: [
      { icon: "🌪️", meaning: "Risk management" },
      { icon: "⚡", meaning: "High performance" },
      { icon: "🛡️", meaning: "Secure and reliable" },
    ],
    overview:
      "Developed a RESTful API for a risk management system, improving data processing efficiency and scalability.",
    asciiArt: `
      +---------------------+
      |  Risk Data          |
      |  +--------------+   |
      |  | PostgreSQL   |   |
      |  | Database     |   |
      |  +--------------+   |
      |         |           |
      |         v           |
      |  +--------------+   |
      |  | Django       |   |
      |  | REST API     |   |
      |  +--------------+   |
      |         |           |
      |         v           |
      |  +--------------+   |
      |  | Frontend     |   |
      |  | Integration  |   |
      |  +--------------+   |
      +---------------------+
    `,
    demoLink: "https://kenari.aptaworks.com",
    stressLevel: 4,
    metrics: [
      { label: "API Latency", value: "120ms" },
      { label: "Data Points Processed", value: "10M+" },
      { label: "Coffee Cups Spent", value: "☕☕☕☕" },
    ],
    techStack: [
      {
        name: "Python",
        level: 4,
        comment: "Django for API development",
        snippet: "class RiskView(APIView):",
      },
      {
        name: "PostgreSQL",
        level: 3,
        comment: "Optimized for complex queries",
        snippet: "SELECT * FROM risks WHERE severity > 5;",
      },
      {
        name: "Django REST Framework",
        level: 4,
        comment: "For building robust APIs",
        snippet: "serializers.Serializer",
      },
    ],
    problems: [
      {
        issue: "Slow data retrieval times",
        solution: "Optimized database schema and queries",
      },
      {
        issue: "API documentation was outdated",
        solution: "Automated documentation generation",
      },
    ],
    challenges: [
      {
        id: "1",
        title: "Database schema complexity",
        status: "CLOSED",
        description: "Redesigned schema for faster queries.",
      },
      {
        id: "2",
        title: "API versioning conflicts",
        status: "PATCHED",
        description: "Implemented versioning strategy to avoid breaking changes.",
      },
      {
        "id": "3",
        "title": "A completely new things",
        "status": "OPEN",
        "description": "Developed an innovative backend solution from scratch, completing the project within a challenging three-month period."
      }
    ],
  },
  "dashboard-engine": {
    id: "dashboard-engine",
    title: "Dashboard Engine",
    subtitle: "Analytics engine that turns coffee into dashboards",
    emojis: [
      { icon: "📊", meaning: "Data visualization" },
      { icon: "☕", meaning: "Fueled by caffeine" },
      { icon: "🐍", meaning: "Python-powered" },
    ],
    overview:
      "Built a dynamic dashboard application, leveraging Python and Streamlit to transform raw data into actionable insights.",
    asciiArt: `
      +---------------------+
      |  Raw Data           |
      |  +--------------+   |
      |  | Clean &      |   |
      |  | Validate     |   |
      |  +--------------+   |
      |         |           |
      |         v           |
      |  +--------------+   |
      |  | Visualize    |   |
      |  | with Matplotlib| |
      |  +--------------+   |
      |         |           |
      |         v           |
      |  +--------------+   |
      |  | Dashboard    |   |
      |  | (Streamlit)  |   |
      |  +--------------+   |
      +---------------------+
    `,
    demoLink: "https://dashboard.aptaworks.com",
    stressLevel: 3,
    metrics: [
      { label: "Data Points Processed", value: "1M+" },
      { label: "Dashboards Generated", value: "50+" },
      { label: "Coffee Cups Spent", value: "☕☕☕" },
    ],
    techStack: [
      {
        name: "Python",
        level: 4,
        comment: "Pandas for ETL, Matplotlib for visuals",
        snippet: "df = pd.read_csv('data.csv')",
      },
      {
        name: "Streamlit",
        level: 3,
        comment: "Turn scripts into dashboards in minutes",
        snippet: "st.line_chart(df)",
      },
      {
        name: "NumPy",
        level: 3,
        comment: "For all the mathy bits",
        snippet: "np.mean(data)",
      },
    ],
    problems: [
      {
        issue: "Data inconsistencies caused visualization errors",
        solution: "Implemented robust data cleaning pipelines",
      },
      {
        issue: "Slow dashboard load times",
        solution: "Optimized data processing with caching",
      },
    ],
    challenges: [
      {
        id: "1",
        title: "Data validation took longer than expected",
        status: "CLOSED",
        description: "Built custom validation scripts to ensure data accuracy.",
      },
      {
        id: "2",
        title: "Streamlit performance bottlenecks",
        status: "PATCHED",
        description: "Optimized component rendering for faster load times.",
      },
    ],
  },
};
