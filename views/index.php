<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]>      <html class="no-js"> <!--<![endif]-->
<html>
<!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="">

    <style>
        [class*=classic]:before {
            content: "Loading...";
        }

        .classic-2 {
            font-weight: bold;
            font-family: sans-serif;
            font-size: 4rem;
            padding-bottom: 8px;
            background: linear-gradient(currentColor 0 0) bottom left/0% 5px no-repeat;
            animation: c2 3s linear infinite;
        }

        @keyframes c2 {
            to {
                background-size: 100% 5px
            }
        }
    </style>
</head>

<body class="bg-gray-800 flex items-center justify-center h-screen">

<!-- l grid-rows-3 m-6 text-base  text-7xl sm:text-4xl md:text-7xl lg:text-9xl bg-gray-700 rounded-lg mt-5 p-8 text-center text-gray-400  m-4 shadow -->


    <div id="status-indicator"
        class="rounded-full text-base bg-gray-700  text-gray-400 shadow w-1/8">
        <!-- class="rounded-full text-base bg-gray-700  text-gray-400 shadow"> -->

        <ul>
            <li><svg id="chevron-up" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-100" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                </svg></li>
            <li>90%</li>
            <li><svg id="chevron-down" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-100" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg></li>
        </ul>

    </div>















    <div class="text-gray-100 opacity-5">

        <div id="loading" class="classic-2 self-center"></div>
    </div>
    <div>
        <div id="profit-content"></div>
        <ul id="current-data-list">

        </ul>
    </div>










    <script src="assets/index.js" async defer></script>

</body>

</html>