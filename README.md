# Run the "setup.sh": Automatically installs packages
```bash setup.sh```



## 📦 Packages You Need to Install (Expo SDK 54)

When you clone your repo (`clerk-authentication-setup`), make sure you have these versions (these were the ones fixed in your debug session):

```sh
# Core
expo install react-native-safe-area-context@5.6.0 react-native-screens@4.16.0 react-native-web@0.21.0
expo install react-native-reanimated@4.1.0 react-native-gesture-handler
expo install @expo/metro-runtime

# Clerk authentication
npm install @clerk/clerk-expo

# Expo Router
npm install expo-router@6.0.3

# UI & styling
npm install nativewind tailwindcss
npm install @expo/vector-icons@15.0.2

# Dev & TypeScript
npm install -D typescript@5.9.2
```

👉 Run `npx expo install` whenever possible, because it chooses the right version for your Expo SDK.

---

## ⚙️ Config Files You Must Set

### `babel.config.js`

```js
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
```

### `tailwind.config.js`

```js
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
```

---

## 🧹 Clearing Caches (important after every config/package change)

```sh
# Stop Metro if running
Ctrl+C

# Clear Expo & Metro bundler cache
npx expo start -c

# If still broken:
rm -rf node_modules
npm install
npx expo start -c
```

---

## 🔑 Key Fixes from Your Debug Session

1. **Reanimated crash** (`makeMutable undefined / NullPointerException`)

   * Caused by mismatched version (`3.17.4` vs Expo SDK 54).
   * Fixed by upgrading to `react-native-reanimated@4.1.0` and adding `"react-native-worklets/plugin"` to Babel.

2. **SafeAreaView warning**

   * Use `import { SafeAreaView } from "react-native-safe-area-context"` instead of React Native’s built-in.

3. **Expo Router errors**

   * Fixed by installing `@expo/metro-runtime` and aligning `expo-router` version.

4. **NativeWind errors on `Text`**

   * Avoid animation/hover classes (`transition-colors`, `hover:*`) on `Text`.
   * Put them on parent `Link` or `TouchableOpacity` instead.

5. **Clerk auto-login**

   * Clerk restores sessions by default. Use `useAuth()` or `useUser()` to check session and explicitly show login screen if no session.

---

## ✅ Future Workflow When Cloning Repos

Whenever you clone a React Native/Expo repo:

1. **Check Expo SDK version** in `package.json` (`"expo": "54.x.x"`).
2. **Install matching deps** using `expo install` (not plain npm install).
3. **Update `babel.config.js`** to include:

   * `"nativewind/babel"`
   * `"react-native-worklets/plugin"` (last plugin).
4. **Update `tailwind.config.js`** to scan both `App.js` and `src/`.
5. **Clear cache** with `npx expo start -c`.

---

