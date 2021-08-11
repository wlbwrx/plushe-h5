module.exports = {
	apps: [
		{
			name: 'plushe-h5',
			script: './server/index.js',
			watch: true,
			ignore_watch: [
				// 从监控目录中排除
				'node_modules',
				'public',
				'static',
			],
			instance_var: 'INSTANCE_ID',
			instances: 'max',
			autorestart: true,
			error_file: '/home/publish/logs/plushe-h5_logs/error.log',
			out_file: '/home/publish/logs/plushe-h5_logs/info.log',
			log_date_format: 'YYYY-MM-DD HH:mm:ss',
			merge_logs: true,
			max_restarts: 1,
			env: {
				NODE_ENV: 'production',
				VUE_APP_NODEPROT: '30002',
				// NODE_DEPLOY: 'NODE_DEPLOY_VALUE',
			},
			max_memory_restart: 'VUE_APP_MAXMEMORY', // Optional: Restarts your app if it reaches 100Mo
		},
	],
}
