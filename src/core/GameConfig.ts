export default {
    panelSize:{
        width:15,
        height:20
    },
    nextSize:{
        width:5,
        height:3
    },
    /**
     * 游戏中方块的旋转方向，true为顺时针
     */
    isClock:true,
    speedLevels:[
        {score:0, duration:1200},
        {score:100, duration:1000},
        {score:200, duration:800},
        {score:500, duration:700},
        {score:800, duration:600},
        {score:1200, duration:500},
        {score:1800, duration:400},
        {score:3000, duration:300},
        {score:4000, duration:300},
        {score:5000, duration:200},
        {score:6000, duration:100}
    ],
    //最高纪录得分
    highestRecordScore:11
}