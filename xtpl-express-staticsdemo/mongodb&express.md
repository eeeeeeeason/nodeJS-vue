
## 第三方登陆
	前端步骤:
		前提:
			1、去微博、微信、QQ开发者中心去注册成为他的开发者 http://open.weibo.com/
			
			2、去开放平台的后台，注册某个App的相关信息，注册慢慢买的信息
			
		正式接入:
			1、去下载它的sdk，就是一个/多个js文件(有点类似于下载jQuery.js)
			
			2、导入到你的项目中，一般都是导入一个js文件，一般都是CDN导入
			
			3、调用它里面特定的接口(比如登录)
				给接口传递一些必要的参数
				weiboLogin('2257804123','afasfaf')
				$("#xxId")
				
			4、等用户同意给我们应用授权授权之后，就可以拿到用户在开放平台(微博，微信)的信息了
			
			昵称、头像、好友关系
			
			5、把上一步获取到的用户的信息传递给后台，后台得存着(把微博用户的信息和我们自己App的账号平台关联起来)
			
		建议:
			首先把流程必须弄清楚，第二，到时候再需要做这个功能的时候，再去看文档，看最新的文档，因为这些开发平台的文档在变，每一个大的版本都会发生改变
				微博：http://open.weibo.com/authentication
				微信：https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419316505&token=&lang=zh_CN
				QQ：http://wiki.connect.qq.com/%E7%BD%91%E7%AB%99%E5%BA%94%E7%94%A8%E6%8E%A5%E5%85%A5%E6%B5%81%E7%A8%8B
				
## 服务端渲染
	
### 前端参与的开发方式，大概两种
	1、服务器端渲染，我们只需要负责写那些静态页面即可(写一些模版的语法)
	
	2、前后端分离【主流趋势】
	
### 服务器端渲染的流程
	1、监听浏览器的请求，明白浏览器的意图 判断我们的url中是否包含类似于index.html等等
	2、根据浏览器的意图，去服务器硬盘上面找到对应资源(html,css,js,xxx)
	3、根据需要去数据库中获取相应的数据
	4、把数据和页面(html)生成一个完整的网页(借助xtpl&xtemplate来操作)
	5、把生成好的完整的网页返回给浏览器，浏览器只需要负责解析渲染出来
	
### xtpl&xtemplate结合起来实现服务器端渲染
	xtemplate : 在页面中写那些占位的模版语法
	
	xtpl : 在nodejs后台开启web服务的js文件中，利用真实的数据替换模版中的占位符，最终得到完整的html页面
	
### 昨天代码（音乐播放器）有些繁琐
	由于使用了我们核心模块中的http模块
		1、把所有处理路由(路径)放在一个入口文件中处理，不太合理
		2、在处理静态资源方面不太给力，写的代码很罗嗦，并且代码都差不多
		3、获取浏览器传递过来的参数的时候，很繁琐
		
	document ---> jQuery
	
----------------------------------

# Express【重点】

## 基本概念
	它是对HTTP封装，用来简化我们网络功能那一块
	
	官网:http://www.expressjs.com.cn/
	
	官方解释:
		基于 Node.js 平台，快速、开放、极简的 web 开发框架。
		
## 学习最终的几点
	1、如何去接收GET/POST传递过来的参数
	
	2、如何通过Express进行分门别类的处理路由
	
	3、静态资源的处理
	
## 使用
	1、Hello World 案例
	
	步骤:
		1、导入包
		
		2、创建一个app
		
		3、请求处理响应
		
		4、开启web服务，开始监听
		
	2、获取GET/POST参数
		GET参数：登录 http://127.0.0.1:3000/login?username=zhangsan&pwd=123
		
		可以直接在我们的req.query中就可以获取了
		
		POST参数：因为express没有直接提供获取POST参数的方法，需要借助一个第三方包 body-parser
		参考:
			https://www.npmjs.com/package/body-parser
		
		步骤:
			1、npm install body-parser --save
			2、导包
			3、实现某些方法
			
			最后通过req.body即可以获取到post提交过来的参数
			
## 路由处理
	前端路由:
		作用:当触发了某个超链接之后，根据路由的配置，决定跳转到哪个页面，最终将这个页面呈现出来
		
	后台的路由
		作用:就是用来分门别类的出路用户发送过来的请求
		
		http://127.0.0.1:3000/login
		http://127.0.0.1:3000/register
		
		http://127.0.0.1:3000/getGoodsList
		http://127.0.0.1:3000/getGoodsInfo
		
		jd购物
		男士:(专门创建一个man.js文件来实现男士区域商品的请求)
			http://www.jd.com/man/xz
			http://www.jd.com/man/ld
			http://www.jd.com/man/px
			
		女士:(专门创建一个girl.js文件来实现女士区域商品的请求)
			http://www.jd.com/girl/xs
			http://www.jd.com/girl/bag
			http://www.jd.com/girl/kh
	
	express中代码实现?
		步骤:
			1、先要创建一个单独的路由(js文件)，来处理某一类请求下面的所有用户请求，并且需要导出去
				1.1 导入包 express
				1.2 创建一个路由对象 
					`const manRouter = express.Router()`
				1.3 在具体的路由js中处理属于我们该文件的路由
					manRouter.get(xxx)
					manRouter.post(xxx)
				1.4 将上面创建的路由对象导出去，在入口文件中使用
				
			2、在入口文件中，导入我们的路由文件，并且使用就可以了
				```
					//导入路由文件
					const manRouter = require(path.join(__dirname,"man/manRouter.js"))
					
					//在入口文件中使用
					app.use('/man',manRouter)
				```
				
## Express中静态资源的处理
	Express希望对我们后台静态资源处理，达到简单的目的，然后只希望我们程序员写一句话就能搞定
	
	步骤:
		1、在我们入口文件中设置静态资源的根目录
			注意点:一定要在路由处理之前设置
			```
				app.use(express.static(path.join(__dirname,'statics')))
			```
		
		2、在我们的页面中，按照我们Express的规则来请求后台静态资源数据
			写link的href,script的src写的时候，除开静态资源根路径之外，按照他在服务器上面的路径规则写
	
----------------------------------

# mongodb数据库

## 数据库
	保存数据的仓库，数据库本质也是一个文件，只是说和普通的文件不太一样，他有自己的存储规则，让我们保存数据和查询数据更加方便
	
## 存储文件的介质
	localStorage 文本文件
	
	如何在代码中对我们的localStorage
	想往localStorage中增加或是查找一条数据
	
	大型数据或是海量数据的时候必须要用到数据库

## 数据库的分类
	客户端：
		iOS/Android/前端
		iOS/Android SQLite 在iOS/Android存储App的数据
	
	服务端：
		关系型数据库
			部门---员工   
			mysql:10万以下 300-1000/时  ORACLE
			sqlserver: 20-30万之间 1000以上/时
			oracle: 60万起 几千/时
				汉白玉
		
		非关系型数据库
			JSON对象的形式来存储
			
			MongoDB : 简单，你会js、JSON就能操作
			Redis
			Memcached 
			
### 数据库的作用
	1、保存应用程序产生的数据(用户注册数据，用户的个人信息等等)
	2、当应用程序需要数据的时候，提供给应用程序去展示
	
----------------------------------

## 安装mongodb服务端

	步骤：
		1、安装mongodb服务端软件
		2、设置mongodb的环境变量，重启终端验证 mongo -version
		3、建立一个文件夹，用来存储mongodb数据库产生的数据(建议放在C盘根目录 mongodb_datas)
		4、启动
			mongod --dbpath c:/mongodb_datas
			
## 启动服务端有几种方式
	1、方式一，直接在cmd中输入 mongod --dbpath c:/mongodb_datas 
		32位: mongod --dbpath c:/mongodb_datas --journal --storageEngine=mmapv1
	
	2、方式二，可以把 mongod --dbpath c:/mongodb_datas 做成一个批处理文件
		32位: mongod --dbpath c:/mongodb_datas --journal --storageEngine=mmapv1
	
	3、方式三，做成开机启动命令
		1、在我们昨天的c:/mongodb_datas下面建议一个文件夹server_log，再在这个文件夹下面建立一个mongodb.log
		
		2、以管理员的身份启动终端
	
			64位运行
			```
				mongod.exe --bind_ip 127.0.0.1 --logpath "C:/mongodb_datas/server_log/mongodb.log" --logappend --dbpath "c:/mongodb_datas" --port 27017 --serviceName "MongoDBServer" --serviceDisplayName "MongoDBServerDisplayName" --install
			```
			
			32位
			```
				mongod.exe --bind_ip 127.0.0.1 --logpath "C:/mongodb_datas/server_log/mongodb.log" --logappend --dbpath "c:/mongodb_datas" --journal --storageEngine=mmapv1  --port 27017 --serviceName "MongoDBServer" --serviceDisplayName "MongoDBServerDisplayName" --install
			```
		
		3、在任务管理器中找到我们MongoDBServer
	

## 使用robomongo这个小机器人来操作我们的数据库中的数据
	步骤:
		1、连接到我们mongodb数据库服务端，并且连接成功之后，服务端会给我们返回一个操作数据库的db对象
		
		2、拿着上一步返回的db对象，对mongodb数据库中的数据进行操作了
		
	连接成功之后，我们要来操作数据的话
		1、创建一个数据库 (相当于在excel中创建空白工作簿)
		2、创建集合 (相当于在excel创建工作表单)
			数据的一个集合，把相关联的数据放在一个集合中
		3、确立表头，插入数据、删除数据、修改数据、查询数据

## MongoDB数据库中的概念
	数据库 ： 一个App中对应一个数据库
	
	集合：相当于Excel中表单，一堆数据的集合，相关联的数据，会放在一个集合中，必须学生相关的数据，放在学生集合中，商品相关的数据，放入一个商品集合中
	
	文档：相当于excel中的每一行数据
	
	一个数据中可以有多个集合(学生集合、食品集合)
	一个集合可以有多条文档(多条数据)

## REPL(NodeJS中)如何操作mongodb数据库中的数据【重点】

	注意:因为我们mongodb不光只有nodejs能操作，java,php,.net都可以操作它里面的数据
	
	我们一般通过NodeJS,java,php等操作mongodb数据库中的数据的时候，我们不会在程序运行阶段去创建数据库和集合
	
	一般我们创建数据库和创建集合在后台人员刚开始编码之前就已经创建好了，在大公司里面会有专门的DBA来进行创建数据库和集合
	
	编码阶段	
		前台人员
		后台人员
			数据库设计，DBA就会建立好我们的数据库、集合
			java,php 
			
## NodeJS中操作mongodb数据库中的数据
	mongodb : https://www.npmjs.com/package/mongodb
	
	思路:
		1、连接到mongodb服务端，连接成功之后，服务端会返回一个db对象
		
		2、拿着这个服务端返回的db对象，操作数据库中的数据(操作szhmqd06数据库中的foodInfo中的数据)
		
	前提:
		必须启动mongodb服务端
		
	具体代码步骤:
		1、安装mongodb第三方包
			npm install mongodb --save
			
		2、导入
		
		3、根据文档写代码
		

----------------------------------