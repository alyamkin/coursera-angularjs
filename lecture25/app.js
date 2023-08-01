(function () {
  'use strict';

  angular
    .module('MenuCategoriesApp', [])
    .controller('PostsController', PostsController)
    .service('PostsControllerService', PostsControllerService)
    .constant('ApiBasePath', 'https://jsonplaceholder.typicode.com');

  PostsController.$inject = ['PostsControllerService'];
  function PostsController(PostsControllerService) {
    var post = this;

    var promise = PostsControllerService.getPosts();

    promise
      .then(function (response) {
        post.postCollection = response.data;
      })
      .catch(function (error) {
        console.log('Something went terribly wrong.');
      });

    post.showPostComments = function (postId) {
      var promise = PostsControllerService.getPostComments(postId);

      promise
        .then(function (response) {
          post.postComments = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  }

  PostsControllerService.$inject = ['$http', 'ApiBasePath'];
  function PostsControllerService($http, ApiBasePath) {
    var service = this;

    service.getPosts = function () {
      var response = $http({
        method: 'GET',
        url: ApiBasePath + '/posts',
      });

      return response;
    };

    service.getPostComments = function (postId) {
      var response = $http({
        method: 'GET',
        url: ApiBasePath + `/posts/${postId}/comments`,
      });

      return response;
    };
  }
})();
