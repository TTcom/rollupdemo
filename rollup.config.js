import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser"; 
//（注意顺序,resolve应当放在commonjs之前）
export default{
	input: './src/index.js',
    output:[
        {
            format: 'umd',
            name: 'Vue',  // 如果format是umd, name必填否则报错
            file: 'dist/index.js',
        },
        {
            format: 'umd',
            name: 'Vue',  // 如果format是umd, name必填否则报错
            file: 'dist/index.min.js',
            plugins: [
                terser({
                    compress: {
                      pure_funcs: ['console.log'], // 去掉console.log函数
                    }
                  })
            ]
        },
    ],
    
    plugins: [  // 注意这里是plugins!!!，我就是写成了plugin，结果插件都无效
		resolve(),   //解决引入依赖的第三方库进行合并的问题
		commonjs(), //解决大量的npm模块是基于CommonJS模块方式，这就导致了大量 npm模块不能直接编译使用的问题
	    babel(),
    ],
    external: [], //不想在最终生成的打包文件中出现的第三方依赖
}


