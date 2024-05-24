class CreateGroupPosts < ActiveRecord::Migration[6.0]
  def change
    create_table :group_posts do |t|
      t.references :group, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.text :content, null: false, limit: 500
      t.timestamps
    end
  end
end
