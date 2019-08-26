export default [{
    label: '序号',
    type: 'index',
    'header-align': 'center'
},{
    prop: 'name',
    label: '姓名',
    align: 'left',
    'header-align': 'center'
},{
    prop: 'age',
    label: '年龄',
    align: 'center',
    'header-align': 'center'
},{
    prop: 'department',
    label: '部门',
    align: 'right',
    'header-align': 'center',
    formatter(row){
        const value = row.department;
        return value.length > 5 
                ? value.slice(0,5) + '...'
                : value
    }
}];
