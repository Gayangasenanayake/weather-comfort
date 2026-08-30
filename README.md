# 🌤️ Weather Comfort Analytics Frontend

A responsive Next.js application for secure weather analytics with MFA authentication and custom comfort scoring.

## 🚀 Features

- **🔐 Secure Authentication** - Login/Register with MFA email verification
- **🌍 City Weather Dashboard** - View detailed weather data for cities worldwide
- **📊 Comfort Score Analytics** - Custom comfort scoring with factor breakdowns
- **🏆 City Rankings** - See cities ranked by comfort score
- **📱 Fully Responsive** - Works on desktop, tablet, and mobile
- **🔒 Protected Routes** - Only authenticated users can access detailed analytics

## 🛠️ Tech Stack

- **Framework**: Next.js 16.3.3 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: JWT with MFA
- **API Integration**: REST API with Bearer token

## 📁 Project Structure

```
src/
├── app/
│   ├── api/              # API route handlers (auth proxy)
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── AuthProvider.tsx  # Authentication context
│   ├── Navbar.tsx        # Navigation bar
│   ├── LoginForm.tsx     # Login form with MFA
│   ├── RegisterForm.tsx  # Registration form
│   ├── WeatherDashboard.tsx
│   ├── WeatherCard.tsx
│   ├── ComfortScoreCard.tsx
│   ├── ComfortRankingList.tsx
│   ├── CityCard.tsx
│   └── LoginPrompt.tsx
├── types/
│   ├── auth.ts           # Authentication types
│   └── weather.ts        # Weather data types
└── styles/
    └── globals.css
```

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_BACKEND_API_URL=http://127.0.0.1:8000/api
```

## 🚦 Authentication Flow

1. **Register** - Create new account with name, email, and password
2. **Login** - Enter email and password
3. **MFA Verification** - Enter 6-digit code sent to email
4. **Access** - Full dashboard access after verification

### Demo Credentials
```
Email:  careers@fidenz.com
Password: Pass#fidenz
```


## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Backend API running

### Installation

```bash
# Clone the repository
git clone <https://github.com/Gayangasenanayake/wscorecast.git>

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

## 🎨 UI Components

### City Cards
- Displays city name, temperature, weather condition
- Shows ranking badge with color coding
- Click to view detailed weather data

### Comfort Score Card
- Visual progress bar with color coding
- Comfort category and emoji indicator
- Global ranking display

### Rankings List
- Sorted list of cities by comfort score
- Medal emojis for top 3 positions
- Progress bars with color coding

### Weather Dashboard
- Full weather details with comfort factors
- Temperature, humidity, wind speed
- Factor breakdown with visual indicators

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **MFA Verification** - Email-based 2-factor authentication
- **Protected Routes** - Only authenticated users access detailed data
- **Secure Token Storage** - Tokens stored in localStorage
- **CORS Configuration** - Proper CORS headers for API calls

## 📱 Responsive Design

The application is fully responsive:
- **Desktop**: Full layout with all features
- **Tablet**: Optimized grid layout
- **Mobile**: Stacked cards, compact navigation

## 🧪 Testing

```bash
# Run tests
npm test

# Run linting
npm run lint
```

## 📦 Dependencies

### Dev Dependencies
- `typescript`: ^5
- `tailwindcss`: ^3.3.0
- `@types/node`: ^20
- `@types/react`: ^18

## 🔄 API Response Handling

The frontend expects the following response structure:


Built with ❤️ using Next.js and Tailwind CSS
```