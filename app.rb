require 'sinatra'
require 'sinatra/json'
require 'json'

# In-memory storage for users
$users = {}
$next_id = 1

class User
  attr_accessor :id, :name, :email

  def initialize(id, name, email)
    @id = id
    @name = name
    @email = email
  end

  def to_hash
    {
      id: @id,
      name: @name,
      email: @email
    }
  end

  def self.from_hash(hash)
    User.new(hash['id'], hash['name'], hash['email'])
  end
end

# Enable JSON parsing
before do
  if request.content_type == 'application/json'
    request.body.rewind
    @request_payload = JSON.parse(request.body.read) rescue nil
  end
end

# Get all users
get '/api/users' do
  json $users.values
end

# Get user by ID
get '/api/users/:id' do
  user_id = params[:id].to_i
  user = $users[user_id]

  if user.nil?
    status 404
    json error: 'User not found'
  else
    json user
  end
end

# Create a new user
post '/api/users' do
  if @request_payload.nil? || @request_payload['name'].nil? || @request_payload['email'].nil?
    status 400
    json error: 'Name and email are required'
  else
    user = User.new($next_id, @request_payload['name'], @request_payload['email'])
    $users[$next_id] = user.to_hash
    $next_id += 1

    status 201
    json user.to_hash
  end
end

# Update an existing user
put '/api/users/:id' do
  user_id = params[:id].to_i

  if $users[user_id].nil?
    status 404
    json error: 'User not found'
  elsif @request_payload.nil? || @request_payload['name'].nil? || @request_payload['email'].nil?
    status 400
    json error: 'Name and email are required'
  else
    user = User.new(user_id, @request_payload['name'], @request_payload['email'])
    $users[user_id] = user.to_hash
    json user.to_hash
  end
end

# Delete a user
delete '/api/users/:id' do
  user_id = params[:id].to_i

  if $users.delete(user_id).nil?
    status 404
    json error: 'User not found'
  else
    status 204
  end
end

# Health check
get '/' do
  'CRUD Demo API is running!'
end
