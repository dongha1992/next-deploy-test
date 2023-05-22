import React from "react";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]";
import Image from "next/image";
import Button from "@/components/Common/Button";

function Signin() {
  let inappdeny_exec_vanillajs = (callback: any) => {
    if (document.readyState != "loading") {
      callback();
    } else {
      document.addEventListener("DOMContentLoaded", callback);
    }
  };

  const handleSignInWithGoogle = () => {
    // const useragt = window.navigator?.userAgent.toLowerCase();
    // if (useragt.match(/kakaotalk/i)) {
    //   window.location.href =
    //     "kakaotalk://web/openExternal?url=" +
    //     encodeURIComponent("/api/auth/signin/google");
    // } else {
    //   // signIn("google");
    //   window.location.href =
    //     "kakaotalk://web/openExternal?url=" +
    //     encodeURIComponent("/api/auth/signin/google");
    // }

    inappdeny_exec_vanillajs(() => {
      /* Do things after DOM has fully loaded */
      function copytoclipboard(val: any) {
        var t = document.createElement("textarea");
        document.body.appendChild(t);
        t.value = val;
        t.select();
        document.execCommand("copy");
        document.body.removeChild(t);
      }

      function inappbrowserout() {
        copytoclipboard(window.location.href);
        alert(
          'URL주소가 복사되었습니다.\n\nSafari가 열리면 주소창을 길게 터치한 뒤, "붙여놓기 및 이동"를 누르면 정상적으로 이용하실 수 있습니다.'
        );
        location.href = "x-web-search://?";
      }

      var useragt = navigator.userAgent.toLowerCase();
      var target_url = location.href;

      if (!useragt.match(/kakaotalk/i)) {
        //카카오톡 외부브라우저로 호출
        location.href =
          "kakaotalk://web/openExternal?url=" + "/api/auth/signin/google";
      } else if (
        useragt.match(
          /inapp|naver|snapchat|wirtschaftswoche|thunderbird|instagram|everytimeapp|whatsApp|electron|wadiz|aliapp|zumapp|iphone(.*)whale|android(.*)whale|kakaostory|band|twitter|DaumApps|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|SamsungBrowser\/[^1]/i
        )
      ) {
        //그외 다른 인앱들
        if (useragt.match(/iphone|ipad|ipod/i)) {
          //아이폰은 강제로 사파리를 실행할 수 없다 ㅠㅠ
          //모바일대응뷰포트강제설정
          var mobile = document.createElement("meta");
          mobile.name = "viewport";
          mobile.content =
            "width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, minimal-ui";
          document.getElementsByTagName("head")[0].appendChild(mobile);
          //노토산스폰트강제설정
          var fonts = document.createElement("link");
          fonts.href =
            "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap";
          document.getElementsByTagName("head")[0].appendChild(fonts);
          document.body.innerHTML =
            "<style>body{margin:0;padding:0;font-family: 'Noto Sans KR', sans-serif;overflow: hidden;height: 100%;}</style><h2 style='padding-top:50px; text-align:center;font-family: 'Noto Sans KR', sans-serif;'>인앱브라우저 호환문제로 인해<br />Safari로 접속해야합니다.</h2><article style='text-align:center; font-size:17px; word-break:keep-all;color:#999;'>아래 버튼을 눌러 Safari를 실행해주세요<br />Safari가 열리면, 주소창을 길게 터치한 뒤,<br />'붙여놓기 및 이동'을 누르면<br />정상적으로 이용할 수 있습니다.<br /><br /><button onclick='inappbrowserout();' style='min-width:180px;margin-top:10px;height:54px;font-weight: 700;background-color:#31408E;color:#fff;border-radius: 4px;font-size:17px;border:0;'>Safari로 열기</button></article><img style='width:70%;margin:50px 15% 0 15%' />";
        } else {
          //안드로이드는 Chrome이 설치되어있음으로 강제로 스킴실행한다.
          location.href =
            "intent://" +
            target_url.replace(/https?:\/\//i, "") +
            "#Intent;scheme=http;package=com.android.chrome;end";
        }
      }
    });
  };
  return (
    <div
      className="h-full w-full flex flex-col justify-center items-center"
      style={{ backgroundColor: "#262626" }}
    >
      <div className="flex justify-center items-center">
        <Image src="/img/scope-logo.jpeg" width={200} height={200} alt="로고" />
      </div>
      <div className="flex justify-center items-center">
        <Button
          className="flex bg-white text-black p-4 rounded-md text-md w-100 hover:bg-white focus:outline-none focus:ring-0"
          type="button"
          onClick={handleSignInWithGoogle}
        >
          <Image
            src="/img/google_logo.png"
            alt="구글 로고"
            width={25}
            height={25}
          />
          <span className="ml-4">구글로 시작하기</span>
        </Button>
      </div>
    </div>
  );
}

export default Signin;

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, options);

  // const userAgent = context.req
  //   ? context.req.headers["user-agent"]
  //   : navigator.userAgent;

  // if (userAgent.match(/kakaotalk/i)) {
  //   // Redirect using server-side code
  //   context.res.writeHead(302, {
  //     Location: "/api/auth/signin/google",
  //   });
  //   context.res.end();

  //   return { props: {} };
  // }

  if (session) {
    //redirect to login page

    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
