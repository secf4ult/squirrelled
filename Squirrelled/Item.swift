//
//  Item.swift
//  Squirrelled
//
//  Created by Yu Xiao on 8/5/24.
//

import Foundation
import SwiftData

@Model
final class Item {
    var timestamp: Date
    
    init(timestamp: Date) {
        self.timestamp = timestamp
    }
}
