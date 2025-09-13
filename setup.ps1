#!/bin/bash

echo "🔧 Setting up Expo + Clerk Authentication + NativeWind environment..."

# Ensure we’re in project root
if [ ! -f "package.json" ]; then
  echo "❌ No package.json found. Please run this script from the project root."
  exit 1
fi

# Install Expo SDK core dependencies
echo "📦 Installing Expo SDK 54 core packages..."
npx expo install react-native-safe-area-context@5.6.0 react-native-screens@4.16.0 react-native-web@0.21.0
npx expo install react-native-reanimated@4.1.0 react-native-gesture-handler
npx expo install @expo/metro-runtime

# Clerk
echo "📦 Installing Clerk..."
npm install @clerk/clerk-expo

# Expo Router
echo "📦 Installing Expo Router..."
npm install expo-router@6.0.3

# NativeWind & Tailwind
echo "📦 Installing NativeWind + TailwindCSS..."
npm install nativewind tailwindcss

# Icons
echo "📦 Installing Expo vector icons..."
npm install @expo/vector-icons@15.0.2

# TypeScript
echo "📦 Installing TypeScript..."
npm install -D typescript@5.9.2

# Overwrite babel.config.js
echo "⚙️ Updating babel.config.js..."
cat > babel.config.js <<EOL
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      "react-native-worklets/plugin", // must be last
    ],
  };
};
EOL

# Overwrite tailwind.config.js
echo "⚙️ Updating tailwind.config.js..."
cat > tailwind.config.js <<EOL
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
EOL

# Clean caches
echo "🧹 Cleaning caches..."
rm -rf node_modules
npm install
npx expo start -c

echo "✅ Setup complete! Run 'npx expo start' to launch your app."
