var app = angular.module("app", ["ngRoute"]);

//routing
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "views/news.html", controller: "news_ctr" })
        .when("/news", { templateUrl: "views/news.html", controller: "news_ctr" })
        .when("/create", { templateUrl: "views/create.html", controller: "create_ctr" })
        .when("/about", { templateUrl: "views/about.html", controller: "body" })
        .when("/faq", { templateUrl: "views/faq.html", controller: "faq_ctr" })
        .otherwise({ template: "<h1>404 Page not found</h1>" , controller: "default"});

});

// factory
app.factory('newsData', function () {
    var newscontent = {};
    newscontent.arr = [];
    newscontent.add = (tit, cont, auth, tag) =>
        newscontent.arr.push({ "title": tit, "content": cont, "author": auth, "tags": tag });
    return newscontent;
});

//navbar controller
app.controller("navbar_ctr", function ($scope, $location) {
    $scope.news_active = "active";
    $scope.create_active = "";
    $scope.about_active = "";
    $scope.show_page = function (sub_page) {

        $scope.news_active = "";
        $scope.create_active = "";
        $scope.about_active = "";


        switch (sub_page) {
            case "news":
                $scope.news_active = "active";
                $location.path("/news");
                break;

            case "about":
                $scope.about_active = "active";
                $location.path("/about");
                break;

            case "create":
                $scope.create_active = "active";
                $location.path("/create");
                break;

            case "faq":
                $scope.faq_active = "active";
                $location.path("/faq");
                break;

            default:
                break;
        }
    };
})

//create controller
app.controller("create_ctr", ['$timeout', '$scope', 'newsData', '$http', function ($timeout, $scope, newsData, $http) {

    $scope.ct = "";
    $scope.date = new Date;
    $scope.current_date = $scope.date.getDate() + "/" + ($scope.date.getMonth() + 1) + "/" + $scope.date.getFullYear();
    $scope.current_time = function () {
        var dt = new Date();
        var date = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
        var time = dt.getHours() + ":" + dt.getMinutes();
        var current = time + " - " + date;
        $scope.ct = current;
        $timeout($scope.current_time, 1000);
    }

    $scope.create_news = (tit,auth,cont,tag) => {
        $http({ url: 'http://localhost:3000/writenews', 
        method: 'POST', 
        data: { "title": tit, "content": cont, "author": auth, "tags": tag, "date": $scope.current_date },
        header: { "Content-Type": "application/json" } })
    };
}]);

// faq controller
app.controller("faq_ctr", function ($location, $scope, $anchorScroll) {
    $scope.go = (tag) => {
        $location.hash(tag);
        $anchorScroll();
    };
});
//news controller
app.controller("news_ctr", ['$scope', 'newsData', '$http', function ($scope, newsData, $http) {
    $scope.news_array;
    $scope.get_news = function () {
        console.log("in getNews");
        $http({ method: 'GET', url: 'http://localhost:3000/getnews' })
            .then(function (response) {
                var raw_data = response.data;
                $scope.news_array = raw_data;
            });
    };
}]);

//footer controller
app.controller("footer_ctr", function ($timeout, $scope, newsData) {

    $scope.ct = "";
    $scope.current_time = function () {
        var dt = new Date();
        var date = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
        var time = dt.getHours() + ":" + dt.getMinutes();
        var current = time + " - " + date;
        $scope.ct = current;
        $timeout($scope.current_time, 1000)
    }
});

//default controller
app.controller("default", function ($scope, $timeout, $location) {

})