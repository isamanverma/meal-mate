import { motion } from "framer-motion";
export const SplashScreen = () => {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 7,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div className="flex h-screen flex-col items-center justify-center gap-28 bg-sexymaroon">
      <motion.svg
        initial="hidden"
        animate="visible"
        width="1034"
        height="331"
        viewBox="0 0 1034 331"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          variants={draw}
          d="M654.5 257C656.038 251.818 659.676 247.765 662.16 243.085C667.829 232.399 671.71 221.241 674.624 209.531C678.277 194.85 680.034 180.015 679.352 165.007C678.911 155.312 677.811 145.631 676.255 135.959C674.149 122.864 670.861 110.258 665.988 98.0045C657.354 76.2916 644.341 57.6512 626.487 42.5148C606.898 25.9065 584.322 15.2513 559.511 8.9547C543.24 4.82526 526.833 2.15045 510 2.49152C502 2.65362 493.976 1.99305 486.001 3.0106C454.975 6.96955 426.951 18.5775 403.153 38.6814C381.677 56.824 365.821 79.2932 356.848 106.45C351.818 121.673 348.974 137.004 347.677 152.974C346.796 163.82 347.43 174.477 348.744 184.969C351.579 207.607 358.399 229.137 370.982 248.512C372.116 250.258 374 253.667 375 255.5M453.5 74.4999C453.434 76.9371 451.461 78.0597 449.99 79.4899C435.916 93.1787 423.952 108.475 416.123 126.553C412.011 136.051 409.221 146.017 407.862 156.482C404.284 184.029 412.641 208.174 429.182 229.358C445.34 250.053 466.813 263.837 492.544 269.808C502.924 272.217 513.717 271.915 524.518 270.655C542.619 268.543 559.235 262.957 574.521 253.033C597.207 238.304 611.624 217.25 619.172 191.902C622.907 179.362 624.687 165.878 622.473 152.504C618.165 126.491 606.396 104.555 587.089 86.4049C575.91 75.8951 563.099 68.2939 548.932 63.1894C539.56 59.8127 529.668 57.6341 519.5 57.4718C508.178 57.291 496.967 57.6484 485.951 60.8295C484.356 61.29 481.822 62.7632 480.01 60.4916C479.929 60.3898 479.941 60.1317 480.013 60.0079C480.129 59.8113 480.333 59.6666 480.5 59.4999M645.5 259C645.747 253.565 649.349 249.412 651.114 244.541C654.949 233.953 658.009 223.324 659.188 212.02C660.008 204.147 660.789 196.403 660.031 188.497C658.033 167.659 651.951 148.138 641.494 130.004C624.893 101.215 601.755 79.2516 571.964 64.5719C554.403 55.9185 535.782 50.9506 516.001 51.5261C504.06 51.8735 492.326 53.3997 481.5 58.9999M1032.5 247.5C1015.28 248.572 999.839 254.811 985.523 264.035C974.149 271.364 962.002 277.237 948.948 280.275C935.928 283.305 922.568 285.433 908.997 283.52C895.412 281.604 882.069 278.757 868.984 274.549C852.769 269.333 836.662 263.446 819.955 260.232C804.55 257.268 788.841 254.393 773.003 258.012C764.898 259.864 757.26 262.966 750.005 267.01C748.634 267.774 747.333 268.667 746 269.5M715 72.9999C716.602 87.2948 715.631 101.676 716.464 116.002C717.693 137.153 716.648 158.335 717.019 179.5C717.436 203.334 717.736 227.176 718.581 250.997C719.302 271.336 718.708 291.668 719 312C719.043 315 718.467 317.81 717.033 320.518C714.326 325.63 708.285 326.795 703.985 323.017C698.343 318.057 697.909 311.063 697.134 304.484C696.1 295.702 695.962 286.848 697.393 277.983C698.236 272.763 693.929 269.95 690.493 267.009C683.307 260.859 674.887 258.07 665.5 258.002C663.667 257.989 661.827 258.101 660.001 257.98C655.227 257.664 652.118 258.317 648.681 263.279C637.748 279.065 622.922 290.989 606.548 301.077C595.681 307.772 584.26 313.515 572.393 317.697C559.727 322.16 546.526 325.307 533.029 327.204C520.125 329.017 507.26 329.235 494.519 327.824C469.112 325.01 445.659 316.052 424.013 302.479C412.903 295.513 402.572 287.541 393.469 278.03C391.517 275.991 389.167 274.333 387 272.5M714 72.4999C714.617 69.8955 712.768 68.3187 711.242 66.1297C706.243 69.3058 704.525 74.6982 702 79.5001C696.702 89.5764 693.824 100.611 691.8 111.555C689.475 124.129 688.958 137.04 689.787 150.014C690.399 159.599 691.385 169.105 693.133 178.475C695.001 188.484 698.151 198.242 702.557 207.473C704.913 212.409 705.272 217.124 704.16 222.533C702.679 229.733 702.499 237.19 701.457 244.494C700.199 253.317 698.636 262.095 697.913 270.993C697.885 271.337 697.713 272.713 696.5 272.5M296 91.4999C295.667 93.9999 294.985 96.5097 295.055 98.9984C295.586 117.865 292.895 136.631 293.422 155.502C293.56 160.451 295.178 164.958 299.565 166.285C308.625 169.027 308.248 175.27 307.572 182.507C306.471 194.315 306.152 206.2 304.902 217.99C303.843 227.982 303.881 238.027 302.615 248.014C301.27 258.616 300.84 269.334 299.99 279.999C299.897 281.172 299.667 282.333 299.5 283.5M325 95.4999C327.827 97.747 327.024 101.138 327.393 104.014C327.965 108.462 328.082 113.007 327.953 117.499C327.589 130.191 329.605 142.798 329.059 155.502C328.736 163.037 327.152 166.87 320.438 168.784C316.004 170.048 315.325 172.461 315.524 175.999C316.47 192.835 317.389 209.674 318.54 226.497C319.259 236.995 319.062 247.541 320.449 258.007C321.084 262.8 321.167 267.667 321.5 272.5M415 96.9999C402.512 107.51 392.144 119.763 385.049 134.524C379.714 145.624 376.017 157.223 373.817 169.467C371.384 183.01 371.532 196.514 372.68 209.985C373.57 220.435 375.461 230.863 378.486 241.004C380.748 248.586 382.472 256.336 385.929 263.534C386.288 264.281 385.667 265.5 385.5 266.5M763 173C770.818 167.11 773.981 159.168 774.065 149.5C774.193 134.685 771.374 120.785 763.608 107.935C761.451 104.366 758.92 101.308 755.975 98.5261C751.795 94.5769 748.192 94.2995 744.041 98.0456C735.881 105.41 731.945 115.164 728.942 125.483C726.434 134.1 727.242 142.874 727.697 151.49C728.244 161.865 733.268 170.178 743 175M761.5 262.5C764.604 271.999 763.239 281.811 763.456 291.501C763.618 298.693 763.807 305.888 762.104 313.025C761.387 316.029 759.953 318.685 758.819 321.425C757.906 323.631 755.363 325.417 752.51 324.941C749.263 324.4 747.586 321.866 746.516 318.994C744.357 313.197 743.473 307.078 743.107 300.993C742.658 293.52 741.556 285.62 743.4 278.605C745.304 271.361 744.085 264.505 744.486 257.499C745.527 239.335 747.014 221.174 747.282 202.997C747.414 194.01 747.404 184.71 744 176M762 174C755.126 178.963 756.52 186.483 757.299 192.964C757.983 198.66 757.818 204.343 758.37 210.013C759.762 224.308 760.477 238.668 761.521 252.998C761.704 255.509 762.167 258 762.5 260.5M315.5 83.4999C315.913 91.0608 313.199 98.3527 313.858 106.012C314.282 110.947 314.468 116.436 312.751 120.904C309.693 128.858 312.288 136.685 311.5 144.5M320.5 274.5C323.671 286.192 322.752 298.142 322.399 309.997C322.127 319.111 315.729 323.35 307 321M307 97.4999C305.883 99.165 305.522 101.015 305.485 103C305.358 109.667 305.363 116.346 304.927 122.995C304.662 127.022 304.346 131.105 303.016 135.005C302.073 137.77 302.605 140.663 302.5 143.5M297 83.4999C298.04 93.6626 300.732 103.603 300.136 114.008C299.747 120.8 300.667 127.667 301 134.5M316 91.4999C317.964 95.3169 317.017 99.5145 317.385 103.511C317.979 109.971 317.731 116.505 318.055 122.997C318.17 125.298 317.739 128.317 321.5 128.5M479.5 60.9999C471.261 64.2049 463.674 68.6835 455.848 72.7037C450.848 75.2722 445.103 76.8046 440.014 79.5267C431.412 84.1284 423.586 89.8975 416 95.9999M300 284.5C300 291.167 299.857 297.837 300.043 304.499C300.205 310.303 301.235 315.904 306 320M325 83.4999C326.31 90.0414 323.43 96.1338 322.912 102.493C322.314 109.838 322.725 117.168 322.471 124.499C322.437 125.493 323.044 126.646 322 127.5M307.5 83.4999C307.333 86.8333 306.159 90.5201 307.182 93.436C310.762 103.639 307.262 114.335 310 124.5M742.5 278.5C738.207 280.126 735.136 284.306 730.485 284.878C726.745 285.338 723.368 287.439 719.5 287M698 277.5C703.454 283.644 710.151 287.104 718.5 287M6.0429 282.923C6.0277 282.932 6.01227 282.94 5.99661 282.949C5.36679 283.278 4.78745 283.363 4.30343 283.396C4.11647 283.409 3.9659 283.415 3.83512 283.42C3.59028 283.429 3.41454 283.436 3.19789 283.48C2.65653 283.589 2.12905 283.239 2.01974 282.698C1.91042 282.157 2.26066 281.629 2.80201 281.52C3.18294 281.443 3.60542 281.425 3.91431 281.413C4.01135 281.409 4.09719 281.405 4.16701 281.4C4.50374 281.377 4.76949 281.329 5.04809 281.188L5.21569 281.088C5.34122 281.014 5.52541 280.906 5.76057 280.768C6.23086 280.492 6.90515 280.098 7.72199 279.625C9.3552 278.679 11.5604 277.418 13.8454 276.156C16.1277 274.895 18.5009 273.627 20.4666 272.673C21.2188 272.307 21.92 271.984 22.539 271.722C22.6533 271.326 23.0057 271.031 23.4312 271.002L23.4332 271.002C23.4511 270.996 23.5018 270.981 23.5939 270.943C23.7558 270.876 23.9706 270.772 24.2324 270.633C24.7539 270.355 25.393 269.976 26.0467 269.575C26.4364 269.337 26.8145 269.101 27.1723 268.878C27.4215 268.722 27.6609 268.573 27.8874 268.434C28.3827 268.128 28.8871 267.821 29.1662 267.707C36.7617 264.607 44.7019 262.771 52.575 260.95C53.8692 260.65 55.1615 260.351 56.4503 260.047C72.9138 256.163 89.632 255.03 106.321 254.048C108.924 253.895 111.474 254.135 113.945 254.411C114.278 254.448 114.61 254.486 114.94 254.524C117.079 254.768 119.156 255.004 121.246 255.029C132.443 255.158 143.468 256.96 154.177 259.361C168.193 262.503 181.701 267.721 194.38 274.416C216.426 286.058 239.241 292.913 264.558 290.528C272.783 289.754 280.654 288.259 288.378 285.785M6.0429 282.923L5.53279 282.063C6.0429 282.923 6.0428 282.923 6.0429 282.923ZM6.0429 282.923L6.23221 282.811C6.35644 282.738 6.53922 282.63 6.77289 282.493C7.24025 282.218 7.91105 281.826 8.72395 281.356C10.3502 280.414 12.543 279.16 14.8124 277.907C17.0843 276.652 19.4217 275.404 21.3404 274.472C22.3012 274.005 23.1422 273.625 23.8101 273.364C24.1443 273.233 24.4217 273.137 24.6405 273.075C24.7494 273.045 24.8358 273.025 24.9019 273.013C24.9687 273.001 24.9985 273 24.9999 273C25.5522 273 25.9999 272.552 26 272C26 271.978 25.9993 271.957 25.9979 271.936C26.355 271.728 26.7267 271.504 27.0914 271.281C27.4808 271.042 27.8792 270.794 28.2469 270.565C28.4952 270.41 28.7295 270.264 28.9377 270.136C29.203 269.972 29.4313 269.833 29.6128 269.728C29.7035 269.675 29.7776 269.633 29.8355 269.603C29.8919 269.573 29.9179 269.561 29.9216 269.559M29.9216 269.559C29.9217 269.559 29.9219 269.559 29.9216 269.559ZM29.9216 269.559L29.5441 268.633M29.9216 269.559C37.3561 266.525 45.1216 264.728 53.0025 262.904C54.302 262.603 55.6047 262.302 56.9096 261.994C73.1827 258.154 89.7388 257.027 106.439 256.044C108.857 255.902 111.259 256.124 113.723 256.399C114.048 256.435 114.374 256.472 114.702 256.51C116.834 256.753 119.023 257.003 121.223 257.028C132.227 257.156 143.101 258.928 153.74 261.313C167.563 264.411 180.905 269.563 193.446 276.185C215.714 287.943 238.923 294.951 264.746 292.52C273.093 291.734 281.108 290.214 288.988 287.69C290.493 287.208 292.13 286.912 293.815 286.608C294.313 286.518 294.815 286.427 295.319 286.331C297.457 285.922 299.652 285.405 301.335 284.313C314.155 275.997 327.634 269.796 342.659 267.193C355.603 264.951 368.334 265.139 380.485 270.582C380.789 270.718 381.082 270.883 381.424 271.074L381.425 271.075C381.523 271.13 381.625 271.187 381.732 271.246C382.185 271.498 382.713 271.775 383.298 271.96C383.895 272.149 384.562 272.247 385.299 272.141C386.035 272.035 386.783 271.735 387.56 271.21C387.98 270.927 388.121 270.373 387.888 269.922C386.287 266.825 383.882 264.353 381.599 262.008L381.589 261.997C379.274 259.619 377.084 257.369 375.628 254.611C375.37 254.122 374.765 253.935 374.276 254.193C373.788 254.451 373.601 255.056 373.859 255.544C375.451 258.559 377.813 260.986 380.062 263.295L380.166 263.403C382.241 265.534 384.213 267.578 385.639 269.988C385.41 270.081 385.202 270.134 385.014 270.161C384.631 270.216 384.272 270.171 383.902 270.053C383.519 269.932 383.137 269.738 382.701 269.497C382.621 269.453 382.538 269.406 382.452 269.357L382.448 269.355C382.096 269.157 381.699 268.934 381.303 268.757M381.303 268.757L380.894 269.669M381.303 268.757C368.663 263.094 355.492 262.941 342.317 265.223C326.955 267.884 313.223 274.218 300.247 282.635C298.93 283.489 297.096 283.955 294.943 284.367C294.489 284.453 294.02 284.538 293.543 284.624C291.836 284.932 290.021 285.259 288.378 285.785M288.378 285.785L288.683 286.737M320 129.5C319.833 134.833 319.667 140.167 319.5 145.5M650 259.5C647.35 258.52 644.993 258.791 642.992 260.993C640.077 264.202 636.142 266.673 635.5 271.5"
          stroke="#F3EAD7"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </motion.svg>
      <span className="font-castaThin text-4xl text-offwhite">Meal Mate</span>
    </motion.div>
  );
};