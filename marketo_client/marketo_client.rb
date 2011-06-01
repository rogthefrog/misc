# client for Marketo SOAP API
# roger 2011-05-31
# requires marketo gem

require 'marketo'
require 'yaml'

class MarketoClient

  CONFIG_FILE = 'marketo.conf'

  def initialize
    @marketo_config = YAML::load(File.open(CONFIG_FILE))
    @client = Rapleaf::Marketo.new_client(@marketo_config['user_id'], @marketo_config['key']) 
  end
  
  # wraps Savon client methods for convenience
  def get_lead_by_idnum(idnum)
    @client.get_lead_by_idnum(idnum)
  end

  def get_lead_by_email(email)
    @client.get_lead_by_email(email)
  end

  def sync_lead(email, first, last, company, mobile)
    @client.sync_lead(email, first, last, company, mobile)
  end

  def sync_lead_record(lead_record)
    @client.sync_lead_record(lead_record)
  end

  def add_to_list(list_key, email)
    @client.add_to_list(list_key, email)
  end

  def remove_from_list(list_key, email)
    @client.remove_from_list(list_key, email)
  end

  def is_member_of_list?(list_key, email)
     @client.is_member_of_list?(list_key, email)
  end

end

