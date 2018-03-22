/**
 * Created by Administrator on 2018/3/12.
 */
(function(){
    angular.module('app.service',[])
        .constant('Root','http://192.168.12.109:9091/graduation/manageAjax/')

        //用户
        .service('userService',function($http,Root){
            //所有用户
            this.getUsers=function(){
                return $http.get(Root+'getUser.php');
            };
            //用户详情
            this.getUserDetails=function(userId){
                return $http.get(Root+'getUserDetails.php',{params:{Id:userId}});
            };
            //用户粉丝
            this.getFensi=function(Id){
                return $http.get(Root+'getFensi.php',{params:{Id:Id}});
            };
            //用户关注
            this.getGuanzhu=function(Id){
                return $http.get(Root+'getGuanzhu.php',{params:{Id:Id}});
            };
            //摄影帖
            this.getUserGraphy=function(Id){
                return $http.get(Root+'getUserGraphy.php',{params:{Id:Id}});
            }
        })

        //标签
        .service('labelService',function($http,Root){
            this.getLabels=function(){
                return $http.get(Root+'getLabels.php');
            }
            this.updateLabel=function(parameter){
                return $http({
                    method : 'post',
                    url : Root+'upDateLabel.php',
                    params:
                    {
                        Id:parameter.Id,
                        Name:parameter.Name
                    }
                });
            };
            this.addLabel=function(labelItem){
                console.log(labelItem.name);
                return $http({
                    method : 'post',
                    url : Root+'addLabel.php',
                    params:
                    {
                        Name:labelItem.name
                    }
                });
            };
            this.deleteLabel=function(Id){
                return $http.get(Root+'deleteLabel.php',{params:{Id:Id}});
            };
        })

        //摄影帖
        .service('photoService',function($http,Root){
            this.getAllGraphy=function(){
                return $http.get(Root+'getAllGraphy.php');
            };
            this.getDaiShenhe=function(){
                return $http.get(Root+'getDaiShenhe.php');
            }
            this.getNoShenhe=function(){
                return $http.get(Root+'getNoShenhe.php');
            }
            this.graphyState=function(State,Id){
                return $http.get(Root+'updateState.php',
                    {params:
                        {
                            State:State,
                            Id:Id
                        }
                    });
            }
        })

        //摄影帖详情
        .service('photoDetailService',function($http,Root){
            this.getSingleGraphy=function(Id){
                return $http.get(Root+'getSingleGraphy.php',{params:{Id:Id}});
            };
        })

        //技巧帖
        .service('skillService',function($http,Root){
            this.getSkill=function(){
                return $http.get(Root+'getSkill.php');
            };
            this.getSkillDetail=function(Id){
                return $http.get(Root+'getSkillDetail.php',{params:{Id:Id}});
            }
            //添加
            this.addSkill=function(item){
                console.log(item);
                return $http({
                    method : 'post',
                    url : Root+'addSkill.php',
                    data:item,
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest:function(data){
                        var formData=new FormData();
                        formData.append('Title',data.Title);
                        formData.append('Content',data.Content);
                        formData.append('Image',data.Image);
                        return formData;
                    }
                });
            };
            //编辑
            this.editSkill=function(item){
                //console.log(item);
                return $http({
                    method : 'post',
                    url : Root+'editSkill.php',
                    data:item,
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest:function(data){
                        var formData=new FormData();
                        formData.append('Id',data.Id);
                        formData.append('Title',data.Title);
                        formData.append('Content',data.Content);
                        formData.append('Image',data.Image);
                        return formData;
                    }
                });
            };
            //删除
            this.deleteSkill=function(Id){
                return $http.get(Root+'deleteSkill.php',{params:{Id:Id}});
            }

        })

        //交流贴
        .service('chatService',function($http,Root){
            this.getAllChat=function(){
                return $http.get(Root+'getAllChat.php');
            };
        })

        //交流贴详情
        .service('chatDetailController',function($http,Root){
            this.getChatDetail=function(Id){
                return $http.get(Root+'getChatDetail.php',{params:{Id:Id}});
            };
        })
})();