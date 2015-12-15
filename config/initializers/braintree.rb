
Braintree::Configuration.environment = :sandbox
Braintree::Configuration.merchant_id = ENV['MERCHANT_BRAIN']
Braintree::Configuration.public_key = ENV['PUBLIC_BRAIN']
Braintree::Configuration.private_key = ENV['PRIVATE_BRAIN']
