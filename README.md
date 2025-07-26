# 🧠 PubMed Article Explorer

An interactive React + TypeScript application for exploring PubMed articles related to Artificial Intelligence (AI) in healthcare. Built with modern tools like Vite, TanStack Query, and Tailwind CSS, the app features live filtering, responsive UI, article detail views, and pagination.

> **Note**: This project includes mock data, due to API's being down during maintenance.

---

## 🚀 Features

- Filter by title, author, and journal
- Paginated list of matching articles
- View article details and abstract in a side panel
- Built with React Query for efficient data fetching & caching
- Fully responsive layout using Tailwind CSS
- Mock API support for offline or development mode

---

## 🛠️ Stack

- **Framework**: [React](https://react.dev/)
- **Tooling**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest)
- **API**: [NCBI E-utilities](https://www.ncbi.nlm.nih.gov/books/NBK25501/) (mocked during maintenance)

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/Harry-Leepz/castello-medical.git
cd castello-medical

# Install dependencies
npm install

# Start the app
npm run dev
```

---

## ⚠️ Limitations

### PubMed API Maintenance

Due to scheduled maintenance at the [NCBI Data Center](https://www.ncbi.nlm.nih.gov/), the real PubMed APIs (`esearch`, `esummary`, `efetch`) were temporarily unavailable during development:

> 📅 **Outage** began: Friday, July 25th, 9:00 PM EDT  
> ⏱️ **Impact**: Live fetching of articles and abstracts was not possible

To ensure development and testing could continue, the application was adapted to support **mock data**.

---

### Mock Data Implementation

To simulate live data while the APIs were offline:

- **Mock summaries** were returned in `usePubMedArticles` using hardcoded article data
- **Mock abstracts** were served in `usePubMedAbstract` using local `pubmedMockData.ts`

## 📚 Credits

PubMed API

TanStack Query

Tailwind CSS

Vitest
