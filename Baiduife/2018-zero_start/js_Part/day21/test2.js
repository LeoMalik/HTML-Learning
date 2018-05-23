var tree = {
    "id": 0,
    "name": "root",
    "left": {
        "id": 1,
        "name": "Simon",
        "left": {
            "id": 3,
            "name": "Carl",
            "left": {
                "id": 7,
                "name": "Lee",
                "left": {
                    "id": 11,
                    "name": "Fate"
                }
            },
            "right": {
                "id": 8,
                "name": "Annie",
                "left": {
                    "id": 12,
                    "name": "Saber"
                }
            }
        },
        "right": {
            "id": 4,
            "name": "Tony",
            "left": {
                "id": 9,
                "name": "Candy"
            }
        }
    },
    "right": {
        "id": 2,
        "name": "right",
        "left": {
            "id": 5,
            "name": "Carl",
        },
        "right": {
            "id": 6,
            "name": "Carl",
            "right": {
                "id": 10,
                "name": "Kai"
            }        
        }
    }
}


// 遍历
function qianxu(object){
    if(object!=null){
        console.log(object["id"]);
        qianxu(object['left']);
        qianxu(object['right']);
    }
}

function zhongxu(object){
    if(object!=null){
        qianxu(object['left']);
        console.log(object["id"]);
        qianxu(object['right']);
    }
}
function zhongxu(object){
    if(object!=null){
        qianxu(object['left']);
        qianxu(object['right']);
        console.log(object["id"]);
    }
}

// 查找姓名
function findIdByName(name){
    var stack=[];
    function jinzhan(object){
        if(object!=null){
            stack.push(object);
            console.log(object["id"]);
            jinzhan(object['left']);
            jinzhan(object['right']);
        }
    } 
    jinzhan(tree);
    for(var i=0;i<stack.length;i++){
        if(stack[i]['name']==name){
            console.log(stack[i]['id'])
        }
    }
}
function findIdByName1(name,object){
    if(object!=null){
        if(object['name']==name)
        {
            console.log(object.id);
            flag=false;
        }
        findIdByName1(name,object.left);
        findIdByName1(name,object.right);
    }
}
findIdByName1('Carl',tree);


// 排序
var arr=[[22, 63], [16, 60], [7, 44], [26, 35], [10, 14]]
console.log(arr.sort(function(a,b){
    if(a[1]<b[1]){
        return 1;
    }
    if(a[1]>b[1]){
        return -1;
    }
    return 0;
}));

var arr1 = [
    {
        id: 1,
        name: 'candy',
        value: 40
    }, {
        id: 2,
        name: 'Simon',
        value: 50
    }, {
        id: 3,
        name: 'Tony',
        value: 45
    }, {
        id: 4,
        name: 'Annie',
        value: 60
    }
];
console.log(arr1.sort(function(a,b){
    if(a['value']<b['value']){
        return -1;
    }
    if(a['value']>b['value']){
        return 1;
    }
    return 0;
}));

// 数据结构的转换
// 对象转数组
var scoreObject = {
    "Tony": {
        "Math": 95,
        "English": 79,
        "Music": 68
    }, 
    "Simon": {
        "Math": 100,
        "English": 95,
        "Music": 98
    }, 
    "Annie": {
        "Math": 54,
        "English": 65,
        "Music": 88
    }
}


function toArray(obj){
    var name=Object.keys(scoreObject);
    var result=[];
    for(var i=0;i<name.length;i++){
        var child=[];
        child[i]=[];
        child[i].push(name[i]);
        var value=Object.keys(scoreObject[name[i]]);
        for(var j=0;j<value.length;j++){
            // scoreObject[name[i]][j];
            child[i].push(scoreObject[name[i]][value[j]]);
        }
        result.push(child[i]);
    }
    return result;
}
console.log(toArray(scoreObject));

// 数组转对象
function test(){
    var menuArr = [
        [1, "Area1", -1],
        [2, "Area2", -1],
        [3, "Area1-1", 1],
        [4, "Area1-2", 1],
        [5, "Area2-1", 2],
        [6, "Area2-2", 2],
        [7, "Area1-2-3", 4],
        [8, "Area2-2-1", 6],
      ];
    
      var menuObject={};

      function objectLoop(obj,id){
        var parent = null;
          for(key in obj){
              if(key==id){
                  parent=obj[key];
                  break;
              }
              else if(obj[key].subMenu){
                  parent=objectLoop(obj[key].subMenu,id);
                  if(parent) 
                  break;
              }
          }
          return parent;
      }

    menuArr.map(function(item){
        var keyValue=item[0].toString();
        var keyParent=item[2].toString();
        var parentObj=objectLoop(menuObject,keyParent);
        
        // 头元素
        if(!parentObj){
            menuObject[keyValue] = { name: item[1] };
        }
        else{
            if (!parentObj.subMenu) parentObj.subMenu = {};
            parentObj.subMenu[keyValue]={name:item[1]};
        }
    });
    
    console.log('原数组：');
    console.log(menuArr);
    console.log('新对象：');
    console.log(menuObject);
    console.log('-----------------------------');
}

test();