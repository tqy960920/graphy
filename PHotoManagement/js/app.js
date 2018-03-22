/**
 * Created by Administrator on 2018/3/12.
 */
(function(){
    var app=angular.module('app',['ui.router','app.controller','app.filter']);
    app.config(function($stateProvider,$urlRouterProvider){
        $stateProvider
            //主页
            .state('homeInfo',{
                url:'/homeInfo',
                controller  : 'homeInfoController',
                templateUrl : 'view/homeInfo.html'
            })
            //所有用户
            .state('userInfo',{
                url:'/userInfo',
                controller  : 'userInfoController',
                templateUrl : 'view/userInfo.html'

            })
            //用户详情
            .state('userDetail',{
                url:'/userDetail/{Id}',
                //url:'/userDetail/{Id}/{Name}',
                controller  : 'userDetailController',
                templateUrl : 'view/userDetail.html'

            })
            //标签
            .state('labelInfo',{
                url:'/labelInfo',
                controller  : 'labelInfoController',
                templateUrl : 'view/labelInfo.html',
                params:{Id:'',Name:''}
            })
            //摄影帖
            .state('graphyInfo',{
                url:'/graphyInfo',
                controller  : 'graphyInfoController',
                templateUrl : 'view/graphyInfo.html'
            })
            //摄影帖详情
            .state('graphyDetail',{
                url:'/graphyDetail/{Id}',
                controller  : 'graphyDetailController',
                templateUrl : 'view/graphyDetail.html'
            })
            //技巧贴
            .state('skillInfo',{
                url:'/skillInfo',
                controller  : 'skillInfoController',
                templateUrl : 'view/skillInfo.html'
            })
            //添加技巧贴
            .state('addSkill',{
                url:'/addSkill',
                controller  : 'addSkillController',
                templateUrl : 'view/addSkill.html'
            })
            //技巧贴编辑
            .state('editSkill',{
                url:'/editSkill/{Id}',
                controller  : 'editSkillController',
                templateUrl : 'view/editSkill.html'
            })
            //交流贴
            .state('chatInfo',{
                url:'/chatInfo',
                controller  : 'chatInfoController',
                templateUrl : 'view/chatInfo.html'
            })
            //交流贴详情
            .state('chatInfoDetail',{
                url:'/chatInfoDetail/{Id}',
                controller  : 'chatInfoDetailController',
                templateUrl : 'view/chatInfoDetail.html'
            })
            //个人中心
            .state('personal',{
                url:'/personal',
                controller  : 'personalController',
                templateUrl : 'view/personal.html'
            });

        $urlRouterProvider.otherwise('homeInfo');

    })
})()