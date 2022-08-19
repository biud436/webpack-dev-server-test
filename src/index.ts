function bootstrap() {
    const root = document.querySelector("#root");
    if (root) {
        const p = document.createElement("p");
        p.innerText = `바닐라 자바스크립트 웹팩 핫리로드 설정 테스트입니다.`;

        root.appendChild(p);
    }
}

bootstrap();
