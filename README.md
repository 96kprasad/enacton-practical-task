# SpaceX Launch Explorer

A modern React/Next.js application for exploring SpaceX launches with advanced filtering, search, and favorites functionality.

## 🚀 Features

### Core Features (Hard Constraints)
- **Search & Filter**: Debounced global search with filters for launch status, upcoming/past launches, and year
- **List & Detail**: Virtualized grid view of launches with detailed information panel
- **Infinite Scroll**: Smooth infinite scrolling with IntersectionObserver API
- **Favorites**: Persistent favorites with localStorage and bulk remove functionality
- **Sorting**: Sort by date or name with real-time updates
- **Performance**: Debounced search, request cancellation, and API response caching with React Query
- **Architecture**: Modular components, custom hooks, and React Query for state management
- **Testing**: Unit tests for hooks and components using Jest/React Testing Library
- **Virtualization**: react-window for performance optimization with large lists

### Technical Implementation
- **API**: SpaceX API v4 (https://api.spacexdata.com/v4)
- **State Management**: React Query for server state + localStorage for favorites
- **Styling**: Tailwind CSS for responsive design
- **TypeScript**: Full type safety throughout the application
- **Performance**: Request caching, debounced search, virtualization, and optimized re-renders

## 🛠 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd enacton-practical-task
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

## 🏗 Architecture & Design

### Folder Structure
```
src/
├── app/                 # Next.js app directory
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── services/           # API services and utilities
├── types/              # TypeScript type definitions
├── utils/              # Helper functions
└── tests/              # Test files
```

### Key Components
- **LaunchGrid**: Virtualized grid view with infinite scroll
- **LaunchCard**: Individual launch card with favorites
- **LaunchDetail**: Detailed launch information panel
- **SearchFilters**: Search and filtering controls
- **FavoritesPanel**: Dedicated favorites management view

### State Management
Using React Query for server state management:
- Automatic caching and background refetching
- Request deduplication and cancellation
- Loading and error states
- Optimistic updates

**Reasoning**: React Query chosen over Context API/Redux for better server state management, automatic caching, and reduced boilerplate while maintaining excellent developer experience.

### Performance Optimizations
- **Debounced Search**: 500ms delay to reduce API calls
- **Request Cancellation**: Automatic cancellation of stale requests
- **API Caching**: 5-minute cache with 10-minute garbage collection
- **Virtualization**: react-window for efficient rendering of large lists
- **Optimized Re-renders**: Proper dependency arrays and memoization

## 🔧 API Integration

### SpaceX API v4
- **Base URL**: `https://api.spacexdata.com/v4`
- **Endpoints Used**:
  - `/launches` - All launch data
  - Individual launch details populated automatically

### API Features Utilized
- **REST API**: Simple GET requests for launch data
- **Rich Data**: Launch details, rocket info, mission patches
- **Real-time Data**: Live launch status and upcoming missions

## 🧪 Testing

### Test Coverage
- **useFavorites Hook**: localStorage integration, toggle functionality, bulk operations
- **LaunchCard Component**: Rendering, interactions, favorite toggling
- **Test Framework**: Jest + React Testing Library + React Query testing utilities

### Running Tests
```bash
npm run test
# or
yarn test
```

## 📱 User Experience

### Key UX Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading States**: Smooth loading indicators with React Query
- **Error Handling**: User-friendly error messages and retry mechanisms
- **Visual Feedback**: Status indicators, hover effects, loading skeletons
- **Performance**: Virtualized lists for smooth scrolling with large datasets

### Search & Filtering
- **Global Search**: Debounced search across launch names
- **Status Filter**: Success, Failed, or All launches
- **Timeline Filter**: Upcoming, Past, or All launches
- **Year Filter**: Filter by specific launch year
- **Sorting**: By date (newest first) or alphabetical by name

## 🔮 Assumptions & Design Decisions

### Assumptions
- Users primarily interested in recent SpaceX launches
- Favorites are personal and don't need server synchronization
- Search should be fast and responsive (hence debouncing)
- Large datasets require virtualization for performance

### Design Decisions
- **React Query over Redux**: Better for server state, automatic caching
- **Virtualization**: Essential for performance with 200+ launches
- **localStorage for Favorites**: Simple, fast, and persistent across sessions
- **Debounced Search**: Balances UX responsiveness with API efficiency
- **Component Composition**: Modular design for reusability and testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.