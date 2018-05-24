$(document).ready(function(){
    var region=$('#region');
    var product=$('#product');
    var month=$('month');
    // 全选标签
    var checkAll_region=$('#region .checkAll');
    var checkAll_product=$('#product .checkAll');
    var inputList_region=$("#region input:not('.checkAll')");
    var inputList_product=$("#product input:not('.checkAll')");
    // true代表全选
    var flag_region=true;

    checkAll_region.click(function(){
        // 获取全选以外的列表
        if(flag_region==true){
            inputList_region.each(function(){
                $(this).attr('checked','true');              
            });
        }
        else{
            inputList_region.each(function(){
                $(this).removeAttr('checked');  
            });
        }
        flag_region=!flag_region;
    });

    region.delegate("input:not('.checkAll')",'click',function(){
        // 统计选中数目
        var checkCount=0;
        // 未选中的数目
        var notCheckCount=0;
        // 获取当前点击对象的副本
        var currentItem=this;
        inputList_region.each(function(){
            console.log($(this).prop('checked'));
            if($(this).prop('checked')==true){
                checkCount++;
            }
            else{
                notCheckCount++;
            }
            // 全选框的操作
            (checkCount==inputList_region.length) ? checkAll_region.attr('checked','true') : checkAll_region.removeAttr('checked');
            // 只要一个选中
            if(notCheckCount==inputList_region.length){
                currentItem.checked = true;
            }
        })
        
    })
});