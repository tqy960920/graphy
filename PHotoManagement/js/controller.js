/**
 * Created by Administrator on 2018/3/12.
 */
(function(){
    angular.module('app.controller',['app.service'])
        .controller('homeInfoController',function($scope){
            $scope.title='控制面板';
        })
        //用户
        .controller('userInfoController',function($scope,userService){
            $scope.title='用户管理';
            $scope.userList=[];
            //分页
            $scope.dataPage1 = {
                pageSize:8,
                pageIndex:1,
                pages:[]
            };
            //改变页码
            $scope.changePage1 = function(pageIndex){
                $scope.dataPage1.pageIndex = pageIndex;
            };
            //所有用户
            userService.getUsers().then(function(response) {
                //console.log(response);
                if(response.data.code == 100){
                    $scope.userList=response.data.data;
                    //
                    var total = Math.ceil($scope.userList.length / $scope.dataPage1.pageSize);
                    for(var i = 0 ;i < total ; i++){
                        $scope.dataPage1.pages[i] = i + 1;
                    }
                }
            });
            //获取所有
            userService.getUsers().then(function(response){
                //console.log(response);
                $scope.userList=response.data.data;
                //console.log($scope.userList);
            });
            //详情
            //$scope.singleUser=function(item){
            //    console.log(item.Id);
            //    $state.go('userDetail', {Id:item.Id});
            //};

        })

        //用户详情
        .controller('userDetailController',function($scope,$stateParams,userService,$window){
            $scope.title='用户详情管理';
            $scope.userDetail=[];
            $scope.userFensi=[];
            $scope.userGuanzhu=[];
            $scope.userGraphy=[];
            console.log($stateParams.Id);

            //获取某用户详情
            userService.getUserDetails($stateParams.Id).then(function(response){
                //console.log(response);
                if(response.data.code==100)
                    $scope.userDetail=response.data.data;

            });
            //获取某用户的粉丝
            $scope.userShow1=true;
            userService.getFensi($stateParams.Id).then(function(response){
                //console.log(response);
                if(response.data.code==100)
                    $scope.userFensi=response.data.data;
                else if(response.data.code==101)
                    $scope.userShow1=!$scope.userShow1;
            });
            //获取某用户关注的人
            $scope.userShow2=true;
            userService.getGuanzhu($stateParams.Id).then(function(response){
                //console.log(response);
                if(response.data.code==100)
                    $scope.userGuanzhu=response.data.data;
                else if(response.data.code==101)
                    $scope.userShow2=!$scope.userShow2;
            });
            //获取某用户发表的帖子
            userService.getUserGraphy($stateParams.Id).then(function(response){
                console.log(response);
                if(response.data.code==100)
                    $scope.userGraphy=response.data.data;
            });

            //返回
            $scope.back=function(){
                $window.history.back();
            }

        })

        //标签
        .controller('labelInfoController',function($scope,$state,labelService){
            $scope.title='标签管理';
            $scope.labelLists=[];
            //分页
            $scope.dataPage2 = {
                pageSize:9,
                pageIndex:1,
                pages:[]
            };
            //改变页码
            $scope.changePage1 = function(pageIndex){
                $scope.dataPage2.pageIndex = pageIndex;
            };
            //所有标签
            labelService.getLabels().then(function(response){
                console.log(response);
                $scope.labelLists=response.data.data;

                var total = Math.ceil($scope.labelLists.length / $scope.dataPage2.pageSize);
                for(var i = 0 ;i < total ; i++){
                    $scope.dataPage2.pages[i] = i + 1;
                }
                for(var i=0;i<$scope.labelLists.length;i++){
                    //所有input状态
                    $scope.labelLists[i].nameShow=true;
                }
                $scope.labelNum=$scope.labelLists.length;

            });

            //编辑
            $scope.parameter={
                Id:'',
                Name:''
            };
            $scope.labelEdit=function(item){
                console.log(item);
                item.nameShow=!item.nameShow;
            };
            //编辑的保存
            $scope.editSave=function(item){
                $scope.parameter.Id=item.Id;
                $scope.parameter.Name=item.Name;
                console.log($scope.parameter);
                labelService.updateLabel($scope.parameter).then(function(response){
                    console.log(response);
                    item.nameShow=!item.nameShow;
                });
            };
            //编辑的取消
            $scope.editCancel=function(item){
                item.nameShow=!item.nameShow;
            };

            //添加
            $scope.labelShow=false;
            $scope.addLabel=function(){
                $scope.labelShow=!$scope.labelShow;
            };
            //添加的保存
            $scope.labelItem={
                name:''
            };
            $scope.labelSave=function(){
                console.log($scope.labelItem.name);
                labelService.addLabel($scope.labelItem).then(function(response){
                    //console.log(1);
                    console.log(response);
                    //添加新行之后也要给编辑行赋初值
                    $scope.labelShow=!$scope.labelShow;
                    var thisLabel = response.data.data;
                    thisLabel.nameShow = true;
                    $scope.labelLists.push(thisLabel);


                });
            };
            //添加的取消
            $scope.labelCancel=function(){
                $scope.labelShow=!$scope.labelShow;
            };
            //删除
            $scope.labelDel=function(item,index){
                console.log(item);
                labelService.deleteLabel(item.Id).then(function(response){
                    console.log(response);
                    $scope.labelLists.splice(index,1);
                });
            };

        })

        //摄影帖
        .controller('graphyInfoController',function($scope,labelService,userService,photoService){
            $scope.title='摄影贴管理';
            $scope.labelList=[];
            $scope.KeyLabel=$scope.KeyLabel||'';
            $scope.KeyName='';
            //获取所有标签
            labelService.getLabels().then(function(response){
                //console.log(response);
                $scope.labelList=response.data.data;
                $scope.labelList.unshift({Id:0,Name:'全部标签'});
                $scope.KeyLabel=$scope.labelList[0];
            });

            //获取所有帖子
            $scope.graphyList=[];
            photoService.getAllGraphy().then(function(response){
                console.log(response);
                $scope.graphyList=response.data.data;
            });

        })
        //摄影帖详情
        .controller('graphyDetailController',function($scope,$stateParams,photoDetailService,$window){
            $scope.title='摄影贴详情管理';
            $scope.singleGraphy=[];
            $scope.singleComment=[];
            console.log($stateParams);
            photoDetailService.getSingleGraphy($stateParams.Id).then(function(response){
                console.log(response);
                $scope.singleGraphy=response.data.data[0];
                $scope.singleComment=response.data.data[1];
            });

            //返回
            $scope.back=function(){
                $window.history.back();
            }
        })

        //技巧贴
        .controller('skillInfoController',function($scope,skillService,$state){
            $scope.title='技巧';
            $scope.skillList=[];

            //技巧
            skillService.getSkill().then(function(response) {
                //console.log(response);
                if(response.data.code == 100){
                    $scope.skillList=response.data.data;
                }
            });

            //添加
            $scope.addSkill=function(){
                $state.go('addSkill');
            };
            //编辑
            $scope.editSkill=function(Id){
                console.log(Id);
                $state.go('editDetail', {Id:Id});
            };

            //删除
            $scope.deleteSkill=function(item,index){
                console.log(item.Id);
                skillService.deleteSkill(item.Id).then(function(response){
                    console.log(response);
                    $scope.skillList.splice(index,1);
                });
            };

        })

        //添加技巧贴
        .controller('addSkillController',function($scope,$window,skillService){
            $scope.title='添加一条技巧贴';

            //网页内容
            $scope.addSkills={
                Id:null,
                Title:'',
                Content:'',
                Image:null
            };
            $scope.addSave=function() {
                //添加
                $scope.addSkills.Image = document.querySelector('#addImgUpLoad').files[0];
                //console.log($scope.addSkills);
                skillService.addSkill($scope.addSkills).then(function (response) {
                    console.log(response);
                    $window.history.back();
                });
            };
            //返回
            $scope.back=function(){
                $window.history.back();
            }
        })

        //编辑技巧贴
        .controller('editSkillController',function($scope,$stateParams,$window,skillService){
            $scope.title='编辑';
            $scope.editSkills={
                Id:null,
                Title:'',
                Content:'',
                Image:null
            };
            //console.log($stateParams.Id);
            skillService.getSkillDetail($stateParams.Id).then(function(response){
                //console.log(response);
                $scope.editSkills.Id=response.data.data.Id;
                $scope.editSkills.Title=response.data.data.Title;
                $scope.editSkills.Content=response.data.data.Content;
                $scope.editSkills.Image=response.data.data.Image;
            });

            var img = document.querySelector('#addSkillImg1');
            var upload = document.querySelector('#addImgUpLoad1');
            console.log(img);
            console.log(upload);

            upload.onchange = function(){
                var current = this;
                //if(current.files.length == 0){
                //    return;
                //}
                //// 检查类型
                var file = current.files[0];
                //
                //// 检查大小
                //if(file.size > 4*1024){
                //    current.value = null;
                //    return;
                //}
                // 检查分辨率和预览
                var fileReader = new FileReader();
                fileReader.onload = function(){
                    var preImage = new Image();
                    preImage.onload = function(){
                        //if(this.width != 700 || this.height != 467){
                        //    current.value = null;
                        //}
                        //else{
                            img.src = preImage.src;
                        //}
                    };
                    preImage.src = this.result;
                    //console.log(this.result);
                }
                fileReader.readAsDataURL(file);
            };

            $scope.editSave=function(){
                $scope.editSkills.Image = document.querySelector('#addImgUpLoad1').files[0];
                console.log($scope.editSkills);

                skillService.editSkill($scope.editSkills).then(function(response){
                    console.log(response);
                    $window.history.back();
                });
            };

            //返回
            $scope.back=function(){
                $window.history.back();
            }
        })

        //交流贴
        .controller('chatInfoController',function($scope,chatService){
            $scope.title="交流贴";
            $scope.chatList=[];
            chatService.getAllChat().then(function(response){
                console.log(response.data.data);
                $scope.chatList=response.data.data;
            });

        })

        //交流贴详情
        .controller('chatInfoDetailController',function($scope,$stateParams,$window,chatDetailController){
            $scope.title='交流贴详情管理';
            console.log($stateParams);
            $scope.chatMsg=[];
            $scope.chatComment=[];
            chatDetailController.getChatDetail($stateParams.Id).then(function(response){
                console.log(response.data.data);
                $scope.chatMsg=response.data.data[0];
                $scope.chatComment=response.data.data[1];
            });

            //返回
            $scope.back=function(){
                $window.history.back();
            }
        })

        //审核
        .controller('personalController',function($scope,photoService){
            $scope.title='个人中心';
            $scope.waitGraphys=[];
            $scope.noGraphys=[];
            $scope.isState=true;
            $scope.current=true;

            $scope.noGraphy=function(){
                $scope.isState=!$scope.isState;
                $scope.current=!$scope.current;
            };
            $scope.waitGraphy=function(){
                $scope.isState=!$scope.isState;
                $scope.current=!$scope.current;
            };
            $scope.pass=function(item,index){
                item.State=1;
                photoService.graphyState(item.State,item.Id).then(function(response){
                    console.log(response);
                    $scope.waitGraphys.splice(index,1);
                });
            };
            $scope.noPass=function(item,index){
                item.State=0;
                photoService.graphyState(item.State,item.Id).then(function(response){
                    console.log(response);
                    $scope.waitGraphys.splice(index,1);
                });
            };
            photoService.getDaiShenhe().then(function(response){
                console.log(response);
                $scope.waitGraphys=response.data.data;
            });
            photoService.getNoShenhe().then(function(response){
                console.log(response);
                $scope.noGraphys=response.data.data;
            });
        })
})()