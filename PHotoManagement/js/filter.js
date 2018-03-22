/**
 * Created by Administrator on 2018/3/14.
 */
(function(){
    angular.module('app.filter',[])
        .filter('photoFilter',function(){
            return function(data,currentLabel,keyName){
                //console.log(currentLabel.Id);
                //console.log(data);
                var temp=Array.from(data);
                if(currentLabel.Id != 0){
                    temp = temp.filter(function(item){
                        return item.LabelId == currentLabel.Id;
                    });
                }
                if(keyName.length > 0){
                    temp = temp.filter(function(item){
                        return item.Title.toLowerCase().indexOf(keyName.toLowerCase()) >= 0;
                    });
                }
                //console.log(temp);
                return temp;
            };
        })

        //用户
        //.filter('pageFilter1' , function(){
        //    return function(list ,size , index){
        //        var startIndex = (index - 1) * size;
        //        var endIndex = index * size;
        //        return list.slice(startIndex , endIndex);
        //    };
        //})
        //技巧
        .filter('pageFilter' , function(){
            return function(list ,size , index){
                var startIndex = (index - 1) * size;
                var endIndex = index * size;
                return list.slice(startIndex , endIndex);
            };
        })

})()