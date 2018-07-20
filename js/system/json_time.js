/*json日期格式转换--YYYY-MM-DD HH24:MI:SS*/
function date_All_format(json_time) {
	var date = new Date(JSON.parse(json_time).time);
	var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
	var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	var date_sysdate = date.getFullYear() + '-' + month + '-' + day + " " + hours + ":" + minutes + ":" + seconds;
	return date_sysdate;
}

/*json日期格式转换--YYYY-MM-DD*/
function date_Day_format(json_time) {
	var date = new Date(JSON.parse(json_time).time);
	var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
	var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	var date_sysdate = date.getFullYear() + '-' + month + '-' + day;
	return date_sysdate;
}

/*计算2个时间相差几分钟和秒数*/
function date_Time_minus(json_time, json_time2) {

	var date1 = new Date(json_time.replace(/-/g, '/')); //日期中的'-'全部替换为'/'用来计算毫秒数
	var date2 = new Date(json_time2.replace(/-/g, '/')); //日期中的'-'全部替换为'/'用来计算毫秒数
	var total = (date2.getTime() - date1.getTime()) / 1000;
	var day = parseInt(total / (24 * 60 * 60)); //计算整数天数
	var afterDay = total - day * 24 * 60 * 60; //取得算出天数后剩余的秒数
	var hour = parseInt(afterDay / (60 * 60)); //计算整数小时数
	var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; //取得算出小时数后剩余的秒数
	var min = parseInt(afterHour / 60); //计算整数分
	var minutes = min < 10 ? "0" + min : min; // 分数不足2位用0补齐
	var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60; //取得算出分后剩余的秒数
	var seconds = afterMin < 10 ? "0" + afterMin : afterMin; // 秒数不足2位用0补齐
	var return_time = minutes + ':' + seconds;
	return return_time;
} 
/*json日期格式转换--YYYY-MM-DD HH24:MI*/
function date_Minutes_format(json_time) {
	var date = new Date(JSON.parse(json_time).time);
	var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
	var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	var date_sysdate = date.getFullYear() + '-' + month + '-' + day + " " + hours + ":" + minutes;
	return date_sysdate;
}