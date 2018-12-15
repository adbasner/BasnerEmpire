# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# user = User.new(username: 'adbasner', password: 'a3f6a3f6', password_confirmation: 'a3f6a3f6', admin: true)
# user.save


# 2.5.1 :001 > user = User.new(name: "Andrew Basner", email: 'andrewbasner@gmail.com', password: 'password', password_confirmation: 'password'
# 2.5.1 :002?>   )
#  => #<User id: nil, name: "Andrew Basner", email: "andrewbasner@gmail.com", password_digest: "$2a$10$YIsYUY0oNklOyf8OKKrLbOdC./linkbUD66eojYKGcL...", created_at: nil, updated_at: nil, admin: false>
# 2.5.1 :003 > user.admin = true
#  => true
# 2.5.1 :004 > user
#  => #<User id: nil, name: "Andrew Basner", email: "andrewbasner@gmail.com", password_digest: "$2a$10$YIsYUY0oNklOyf8OKKrLbOdC./linkbUD66eojYKGcL...", created_at: nil, updated_at: nil, admin: true>
# 2.5.1 :005 > user.save