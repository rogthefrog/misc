#!/home/roger/.rvm/bin/ruby
require 'rubygems'
require 'stomp'

begin
  
    @port     = 61613
    @host     = "amq-staging.crunchconnect.com"
    @user     = "stomp"
    @password = "stomp"
    
    @host = ENV["STOMP_HOST"] if ENV["STOMP_HOST"] != NIL
    @port = ENV["STOMP_PORT"] if ENV["STOMP_PORT"] != NIL
    
    @destination = "/topic/stompcat"
    @destination = $*[0] if $*[0] != NIL
    
    $stderr.print "Connecting to stomp://#{@host}:#{@port} as #{@user}\n"
    @conn = Stomp::Connection.open @user, @password, @host, @port, true
    $stderr.print "Sending input to #{@destination}\n"

    @headers = {'persistent'=>'false'} 
    @headers['reply-to'] = $*[1] if $*[1] != NIL

    STDIN.each_line { |line| 
        @conn.send @destination, line, @headers
    }
    @conn.disconnect

rescue 
end
