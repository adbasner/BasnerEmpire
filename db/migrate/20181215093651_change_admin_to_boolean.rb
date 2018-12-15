class ChangeAdminToBoolean < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :admin, :string
  end
end
