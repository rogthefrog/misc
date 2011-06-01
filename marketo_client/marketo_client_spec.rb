# marketo_client_spec.rb
require './marketo_client'

TEST_EMAIL = 'example@example.com'
TEST_LEAD_ID = 1

describe MarketoClient do
  describe "#get_lead_by_email" do
    it "returns a lead record for example@example.com" do
      marketo_client = MarketoClient.new
      record = marketo_client.get_lead_by_email(TEST_EMAIL)
      record.should_not be_nil
      record.get_attribute('Email').should == TEST_EMAIL
    end
  end
  describe "#get_lead_by_idnum" do
    it "returns a lead record for id 1" do
      marketo_client = MarketoClient.new
      record = marketo_client.get_lead_by_idnum(TEST_LEAD_ID)
      record.should_not be_nil
      record.get_attribute('Email').should == TEST_EMAIL
    end
  end

end
