class AddImagesToPosts4 < ActiveRecord::Migration[6.0]
  def change
    add_column :posts, :images_posts_data, :text, array: true
  end
end
