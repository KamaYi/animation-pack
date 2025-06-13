### 发布命令
npm version patch  # 修复 bug (1.0.0 → 1.0.1)
npm version minor  # 新增功能 (1.0.0 → 1.1.0)
npm version major  # 重大变更 (1.0.0 → 2.0.0)
npm publish        # 发布新版本

### 高级命令

发布预发布版：

bash
npm version 1.0.0-beta.1
npm publish --tag beta
用户可通过 npm install your-package@beta 安装测试版

撤销发布（24小时内有效）：

bash
npm unpublish your-package@1.0.0
查看包信息：

bash
npm view your-package-name