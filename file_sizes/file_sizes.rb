File.open('file_sizes.txt', 'r').each_line do |l|
  # 03012_treesbythewater_1680x1050.jpeg-sample/2490x1867.png - 7654305
  bits = l.split(/\/([0-9]+)x([0-9]+)\D.+?(\d+)$/).collect! { |x| x.strip }
  puts "%s,%s,%s" % [ bits[1], bits[2], bits[3] ] unless bits[1].nil?
end

  
