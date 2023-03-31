const axios = require('axios');

const baseURL = process.env.LOCATION_API || 'http://127.0.0.1:8080';

module.exports = function (user) {

    var instance;

    if (user) {
        var registrationId = user['registrationId'];
        var accessToken = user['accessToken'];
        var refreshToken = user['refreshToken'];
        // TODO interceptor 설정 후 만기된 요청에 대해 자동으로 refreshToken 을 사용하도록 해야한다.
        // refreshToken google 은 access-type=offline, github은 Github-App 으로 재등록하면 발급가능하다.
        // 그런데 일단 이대로 진행할시, 어떤 문제가 생기는지 지켜보자.

        instance = axios.create({
            baseURL: baseURL,
            headers: {
                RegistrationId: registrationId,
                Authorization: `Bearer ${accessToken}`
            }
        });
    } else {
        instance = axios.create({
            baseURL: baseURL
        });
    }

    instance.interceptors.response.use(function (response) {
        // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
        // 응답 데이터가 있는 작업 수행
        return response;
    }, function (error) {
        // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
        // 응답 오류가 있는 작업 수행
        return Promise.reject(error);
    });

    return instance;
};