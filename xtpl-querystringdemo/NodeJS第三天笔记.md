# 内容回顾

## querystring

	作用:将浏览器传递过来的键值对的参数字符串，转成js对象
	
	注意点:它不负责接收浏览器传递过来的数据，只负责将传递过来的数据，进行转换
	
## GET&POST
	GET : req.url ---> url.parse(url字符串) ---> querystring.parse(urlObj.query)

	POST : req.on('data',(chunk)=>{
			body+=chunck
		})
		
		req.on('end',()=>{
			querystring.parse(body)
		})

---------------------

## path&fs

### path的作用
	获取要操作文件的路径
	path.join(__dirname,'要操作的文件路径')  用来拼接路径
	
### fs的作用
	操作服务器硬盘上面的文件(开发完毕之后，经过打包压缩等一系列优化之后上传上去的文件)
	
	读 readFile
	写 writeFile/appendFile
	
	文件夹的操作
		mkdir
		rmdir
		exists
		rename

---------------------

## 自定义模块

### 模块的分类
	核心模块(包)
	
	第三方模块(包)
		npmjs.com
		
	自定义模块(包)
		淘宝开源:http://code.taobao.org
		
	注意点:
		在使用require引入模块的时候，核心模块和第三方模块，写上名字即可
		
		如果是自定义模块，写上全路径
		
### 如何去自定义模块
	自执行函数
	
	(function($){
		xxx:xxx
	})(jQuery)
	
	AMD:requireJS
	#define([..,..],function($,xxx){
		
	})
	
	CommonJS
		引入： require('核心/第三方/自定义模块')
		
		暴露,导出 : module.exports = {}
		
---------------------

## 今天目标


## 自定义模块

### 实现自定义模块

### 把我们写好的自定义模块发布到npmjs上面去

	前提准备:
		1、把我们要上传上去的自定义模块，按照npmjs的要求进行完善
			package.json(描述我们自己写的这个自定义模块)
			
			如果要想正确发布到npmjs.com这个时候，完善package.json中的内容，详见下一章节
			
		2、注册npmjs.com的账号
		
	发布到npmjs.com【网速还是要可以】
		使用npm指令发布，在终端里面操作
		
		步骤:
			1、要让终端连接上我们npmjs.com
			`
				npm adduser，会提示让你输入用户名，密码，邮箱
			`
			
			2、发布
			`
				npm publish
			`
			
			3、升级
				1、改代码，一定要把版本号递增（不能减少）
				
			4、撤销
			```
				npm unpublish szhmqd06calc@2.1.0
				
				npm unpublish 包的名称@版本号
			```
	
	注意事项:
		1、必须在我们项目根目录下面，在进行操作
		2、在任何终端里面输入密码都是没有提示的，输完之后，按回车即可
		3、每次升级一定要对版本号进行递增，大的版本迭代，更改一个大版本号，如果是小版本修复，就写上小的版本号
		
	
### 发布自定义模块到npmjs.com的时候，package.json的配置
	步骤:
		1、在项目的根目录下，使用npm init 或是 npm init -y 来生成一个package.json
		

### 下载第三方包的途径补充
	平时下载第三方包:
		npm i/install 包名称 --save-dev/--save

	http://npm.taobao.org/
	
	因为我们有时候去npmjs.com上面下载第三方包可能比较慢，这个时候我们就可以考虑从国内的淘宝服务器上面去下载
	
	前提:
		1、安装nrm 用来切换镜像 `npm i nrm -g`
			nrm ls 看当前有哪些镜像可用
			nrm use 镜像名称，切换镜像
			
		2、安装cnpm 这个全局包，用来从http://npm.taobao.org/下载第三方包
			`
				npm i cnpm -g
			`
	
	使用:
		在项目根目录下，使用cnpm i 包名 --save，来使用
		
	开发建议：
		喜欢从npmjs.com上面下载，网速好，建议还是从npmjs.com上面去下载

---------------------

## 服务器端渲染(服务器端动态生成网页)
	
### 前端开发的两种方式
	
	1、服务端渲染(Node)
	
	2、前后端分离（趋势）


### 案列1
	当在浏览器中输入 http://127.0.0.1:5555/index.html 把首页返回给你，并且让li变红
	
	步骤:(两大步)
	
	发送第一次请求 http://127.0.0.1:5555/index.html
	1、后台接收到请求，明白需要请求的是index.html
	2、利用fs,path去读取服务器硬盘上面的index.html
	3、去数据库中获取需要的数据
	4、利用数据，生成html片段，然后使用片段替换index.html中的占位符
	5、将最终完整的网页返回给浏览器去解析呈现
	6、浏览器拿着服务器返回的完整的html内容进行解析渲染
	7、当解析到<link>标签时，会再向服务器发送请求，请求服务器上面的css资源
	
	发送第二次请求 http://127.0.0.1:5555/abc.css
	1、后台接收到请求，明白需要的是site.css的内容
	2、利用fs,path去读取服务器硬盘上面的site.css
	3、将内容返回给浏览器去渲染
	4、浏览器拿到返回的css内容，对浏览器中的li进行css渲染
	
### xtemplate&xtpl
	node中，进行生成动态网页的模版
	
	注意点:
		这两个必须要一起用
		
	xtemplate:就是在index.html(网页中)写一些类似于模版引擎的语法（在我们网页中进行占位的）,这个就有点像我们上一章节中`${lis}`的作用，注意，我们如果用了xtemplate你就要按照它的格式来写，并且xtemplate语法很强大(比如：实现页面之间的集成)，总结一句话，它的作用就是在页面中进行占位的
	
	参考:https://github.com/xtemplate/xtemplate/blob/master/docs/syntax-cn.md
	
	xtpl:读取需要替换的网页，将里面用xtemplate写的东西，用真实的数据替换掉，并且它还还会帮我们返回生成好的完整的html页面
	
	参考:https://www.npmjs.com/package/xtpl
	
	写代码
		1、在index.html中使用xtemplate写上占位的代码
		2、在开启web服务的js中使用xtpl，利用真实的数据替换index.html中占位的部分，最终得到替换之后的结果(完整的带有数据的html页面)

### 使用步骤
	1、安装包
		```
			npm i xtpl xtemplate --save
		```
		
	2、现在html中利用xtemplate语法进行占位(不需要在页面中导入xtemplate)
	
	3、在开启web服务的js中，使用xtpl，利用真实的数据，替换index.html中的这些占位符，最终得到一个完整的带有数据的html页面
		
### 简易的音乐播放器
	步骤:
		1、利用xtemplate&xtpl把我们音乐界面呈现出来
			步骤:
				1、浏览器发送请求: http://127.0.0.1:3000/list.html
				2、利用xtemplate在list.html写上占位的代码
				3、在开启web服务器的js中利用xtpl，结合真实的数据，替换list.html中的占位符，得到一个带有数据的html
				4、返回给浏览器去解析呈现
		
		2、再去实现播放音乐的功能
			因为我们等下同一时刻只能播放一首音乐，所以写一个<audio>标签就行了
			1、当点击了我们页面上面每一个音乐播放的超链接
			2、触发play函数，把音乐名称传递过来，在里面拼接好url
			3、拿着audio标签，发送请求 audio更改src属性就行了
			4、后台收到请求之后，找到对应的音频文件，返回给audio标签
			5、audio拿到之后就可以播放了
			
	思考:
		如何用一个audio标签播放多首音乐:前提：同一时刻只会播放一首音乐???
			
			当点击某个连接的时候，就将我们的audio的src更改成要播放音乐的url
			
### 浏览器当发送GET请求的时候，如果路径中有中文或是特殊字符，它会对我们的中文和特殊字符进行URL编码
	Node中，使用querystring.unescape(浏览器传递过来的编码之后的GET请求路径字符串)
	

---------------------

## 安装mongodb数据库

## 配置环境变量	
	将安装目录配置到环境变量中

## 启动mongodb数据库
	
	前提准备:
		在C盘下面建立一个文件夹(mongodb_datas)
		
	启动
		64位 ： mongod --dbpath c:/mongodb_datas
		32位 ： mongod --dbpath c:/mongodb_datas --journal --storageEngine=mmapv1
---------------------
