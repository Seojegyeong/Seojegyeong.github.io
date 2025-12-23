import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", //정적 export 모드로 설정
  images: {
    unoptimized: true, //  export에서 next/image 사용 가능하게
  },
};

export default nextConfig;
