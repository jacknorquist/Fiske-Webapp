class AddImagesToPosts3 < ActiveRecord::Migration[6.0]
  def change
    remove_column :posts, :images_posts_data
    # add_column :groups, :images_posts_data, :text, array: true
  end
end
