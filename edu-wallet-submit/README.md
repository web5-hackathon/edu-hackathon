# EduWallet



## Get started

1. Install dependencies (updates may cause build failures)


   ```bash
   bun install   
   ```

2. Precompile the program (since native components are used)


   ```bash
   bun expo prebuild
   ```

3. Modify build configuration files: Add the following line in android/gradle.properties and android/gradle/wrapper/gradle-wrapper.properties (to prevent certain dependencies from failing to install)：
   ```
   https.protocols=TLSv1.1,TLSv1.2,TLSv1.3
   ```
   `android/gradle/wrapper/gradle-wrapper.properties`中，`distributionUrl`属性中的值改为：
   ```
   https://services.gradle.org/distributions/gradle-8.5-all.zip
   ```

4. Start the program

   ```bash
    bun expo start
   ```

   Press s to switch to development build mode.

   Then press a to launch the app in the emulator.



## How to Build

Link this project to your own Expo account, then use the command line to build：

```
eas build -p android
```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
