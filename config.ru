class App
  require 'erb'
  require 'browser'

  def call(env)
    @browser = Browser.new(env['HTTP_USER_AGENT'])
    path_info = (env['PATH_INFO'] == '/') ? '/index.html.erb' : env['PATH_INFO']
    if path_info.split('/').last["."]
      extension = path_info.split('/').last.split('.').last
    else # 將 /abc 預設為 /abc.html.erb
      html = true
      path_info += ".html.erb"
      extension = "html"
    end
    file_full_path = "dist#{path_info}"
    if File.file?(file_full_path)
      if html
        [200,{'Content-Type' => content_type[extension], 'Cache-Control' => 'public, max-age=86400'},[erb(file_full_path)]]
      else
        [200,{'Content-Type' => content_type[extension], 'Cache-Control' => 'public, max-age=86400'},[File.read(file_full_path)]]
      end
    else # 沒有的資源就 404
      [404,{},[]]
    end
  end

  def content_type
    {
      'erb'  => 'text/html',
      'html' => 'text/html',
      'js'   => 'text/javascript',
      'css'  => 'text/css',
      'svg'  => 'image/svg+xml',
      'ico'  => 'image/x-icon',
      'map'  => 'application/octet-stream',
      'png'  => 'image/png',
      'jpg'  => 'image/jpeg',
      'jpeg'  => 'image/jpeg',
      'gif'  => 'image/gif',
    }
  end

  def erb(template)
    path = File.expand_path("#{template}")
    ERB.new(File.read(path)).result(binding)
  end
end

run App.new