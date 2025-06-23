│
├── src/                   # 源代码目录
│   ├── common/            # 公共模块
│       ├── decorators     # 装饰器
│       ├── dtos           # 数据传输对象
│       ├── filters        # 异常过滤器
│       ├── guards         # 守卫
│       ├── interceptors   # 拦截器
│       ├── middlewares    # 中间件
│       ├── modules        # 模块
│       ├── pipes          # 管道
│   ├── config/            # 配置文件
│   ├── enums/             # 枚举类型
│   ├── modules/           # 业务模块
│   ├── types/             # 类型定义
│   ├── utils/             # 工具函数
│   └── app.module.ts      # 主模块       
│   └── main.ts            # 应用入口文件    
│
├── static/                # 静态资源目录
├── tests/                 # 测试代码
├── .gitignore             # Git忽略文件配置
├── package.json           # 项目依赖配置
├── tsconfig.json          # TypeScript配置文件
└── .env                   # 环境变量配置文件

// 创建模块文件夹
nest g resource [moduleName] --no-spec
// 创建模块
nest g module [moduleName] --no-spec
// 创建控制器
nest g controller [moduleName] --no-spec
// 创建服务
nest g service [moduleName] --no-spec
// 创建实体
nest g class [moduleName] --no-spec
// 创建DTO
nest g class [moduleName] --no-spec --flat --no-spec
// 创建接口
nest g interface [moduleName] --no-spec