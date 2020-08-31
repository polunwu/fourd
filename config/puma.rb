# USAGE: bundle exec puma -C puma.rb
log_requests
threads 5, 5
workers 2
# environment 'production'
# stdout_redirect 'puma.stdout.log', 'puma.stderr.log', true
preload_app!