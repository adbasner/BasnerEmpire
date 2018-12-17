class ChangeMessageStringToText < ActiveRecord::Migration[5.2]
  def change
    change_column :messages, :message, :text
  end
end
