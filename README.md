# 프로젝트 구조

    크게 Node-Express 와 create-react-app 두 개의 내용으로 구성된다.

    React App 의 build 결과물은 build 폴더에 담기게 되고,

    Express server 는 build 폴더를 리소스(기본 public) 폴더로 사용하여 구동된다.
    (관리의 용이함을 위해 한 프로젝트로 구성한 결과이다)


## Node-Express
---------------

### bin/www, app.js

    express 서버 기본 구성요소

### module/**

    express 서버에서 공통으로 사용하는 모듈

### routes/**

    express 서버 라우터


## React App
------------

### @types

    typescript 가 해당 위치에 설정된 내용에 따라 추가 type 을 인식하도록 함. ex) png 파일

### tsconfig.json

    typescript 빌드를 위한 properties 파일

### public/**

    React static 파일

### src/assets/**

    React 가 참조할 모든 리소스 파일

### src/components/**

    React Components
    화면 구성요소 단위로 분리된 파일들

### src/context/**

    React Contexts
    Components 들 사이에서 공유되어야할 데이터 모음집

### src/data/**

    React 설정 json 파일들

### src/hooks/**

    Custom Hooks 파일들

### src/pages/**

    react-router-dom 에 의해 그려질 페이지 컨테이너

### src/utils/**

    Javascript(Typescript) 단위의 유틸 파일들

### src/index.tsx

    React App 이 참조할 Context-Provider 를 적용

### src/App.tsx

    React App 의 화면 메인



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
