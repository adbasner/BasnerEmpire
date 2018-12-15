json.posts @posts, partial: 'posts', as: :post

# non partial methods
# --------------------
# json.posts @posts.each do |post|
#   json.id post.id
#   json.title post.title
#   json.content post.content
#   json.created_at post.created_at
#   json.updated_at post.updated_at
# end

# same as:
# json.posts @posts

# partial methods
# ---------------------


# json.posts do
#   json.array! @posts, partial: 'posts', as: :post
# end

# json.posts do
#   json.partial! 'posts', collection: @posts, as: :post
# end
