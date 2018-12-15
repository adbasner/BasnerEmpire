class User < ApplicationRecord
  has_secure_password
  has_many :posts, dependent: :destroy
  validates :name, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :password_confirmation, presence: true
end
