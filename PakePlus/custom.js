window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});const setTokenCookie = () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBzZ2hpdWFuZy50b3AiLCJleHAiOjQ5MjU1OTIwODgsImlkZW50aXR5Ijoic3VwZXJfYWRtaW4ifQ.ZAV4Wjs0AYZ13M4XZKDZsU1SWGbWxFBT6j6fgMe5dA4";
    const cookieName = "token";
    document.cookie = `${cookieName}=${encodeURIComponent(token)}; path=/; secure; SameSite=Lax`;
    console.log("HTTPS环境下Token Cookie已设置（会话级，无有效期）");
};

// ******** 核心新增：页面加载完成后立即执行Cookie设置 ********
// 方式1：DOM加载完成后执行（优先）
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTokenCookie(); // 页面已加载，直接执行
    console.log(document.cookie)
} else {
    // 页面未加载完成，监听加载完成事件
    document.addEventListener('DOMContentLoaded', setTokenCookie);
}

// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })