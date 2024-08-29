# EduWallet



## Get started

1. 安装依赖（更新会导致构建失败）

   ```bash
   bun install   
   ```

2. 预编译程序(因为用到了原生组件)
   ```bash
   bun expo prebuild
   ```

3. 构建配置文件修改：
   请在`android/gradle.properties`和`android/gradle/wrapper/gradle-wrapper.properties`中新增一行（防止部分依赖安装失败）：
   ```
   https.protocols=TLSv1.1,TLSv1.2,TLSv1.3
   ```
   `android/gradle/wrapper/gradle-wrapper.properties`中，`distributionUrl`属性中的值改为：
   ```
   https://services.gradle.org/distributions/gradle-8.5-all.zip
   ```

4. 启动程序
   ```bash
    bun expo start
   ```
   按下 `s` 键切换到 **development build** 模式。

   再按下 `a` 键，以在模拟器中启动。

## 如何打包

请将该项目链接至自己的Expo账号，然后使用命令行打包：

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
